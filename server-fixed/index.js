/* eslint no-console: 0, quotes: 0 */

import express from 'express';
import exphbs from 'express-handlebars';
import sanitizeHTML from 'sanitize-html';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './lib/db.js';
import RateLimiter from 'express-rate-limit';
import check from 'check-types';



const app = express();

app.use('/dependencies', express.static('public'));

const limiter = new RateLimiter({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});
app.use(limiter);

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
    scriptSrc: ["'self'", 'maxcdn.bootstrapcdn.com', 'code.jquery.com'],
    fontSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}));

_setupHandlebars(app);

_setupEndpoints(app);

db.startDb('mongodb://localhost:27017/myproject', () => {
  app.listen(8081, () => console.log('Server started') );
});


function _setupHandlebars(app) {
  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');
}

function _setupEndpoints(app) {

  app.get('/', (req, res) => {
    db.find({}, (err, data) => {

      res.render('home', {
        helpers: {
          posts: data
        }
      });
    });
  });

  app.post('/', bodyParser.json(), (req, res) => {
    if (!req.body || !req.body.content) return res.sendStatus(400);
    req.body.content = sanitizeHTML(req.body.content);
    db.save(req.body, (err) => {
      if(!err) return res.sendStatus(201);
      res.sendStatus(500);
    });

  });

  app.delete('/', bodyParser.json(), (req, res) => {
    const id = req.body && req.body.id;
    if(!check.string(id)) return res.sendStatus(400);
    db.del(id, (err, data) => {
      if(!err) return res.sendStatus(204);
      res.sendStatus(500);
    });
  });

}
