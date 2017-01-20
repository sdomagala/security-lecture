/*eslint no-console: 0, quotes: 0 */

//limiter
const limiter = new RateLimiter({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});
app.use(limiter);

let howManyRequests = 1;
console.log(howManyRequests++);

//csp
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com', 'code.jquery.com']
  }
}));


//check type
import check from 'check-types';
if(!check.string(data)) return cb('Passed value is string');
