/* eslint no-console: 0 */

import express from 'express';
import exphbs from 'express-handlebars';
import sanitizeHTML from 'sanitize-html';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './lib/db.js';
import RateLimiter from 'express-rate-limit';



const app = express();

app.use('/dependencies', express.static('public'));

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
      console.log(data);

      res.render('home', {
        helpers: {
          posts: data
        }
      });
    });
  });

  app.post('/', bodyParser.json(), (req, res) => {

    db.save(req.body, () => {
      res.sendStatus(201);
    });

  });

  app.delete('/', bodyParser.json(), (req, res) => {

    db.del(req.body, (err, data) => {
      res.sendStatus(204);
    });
  });

}
