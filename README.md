# To run presentation

Simply open index.html in root of project

# To run both services

## Vulnerable
```
cd server
npm install
mongod (in other terminal)
npm start
```

## Fixed
```
cd server-fixed
npm install
mongod (in other terminal)
npm start
```


## Calls you can try:

### I strongly advise Postman to try it.

Convention:

HTTP VERB / PATH
```
body of the request
```

### To test Content Security Policy
POST http://localhost:8081/
```
{
  "content":"<h1>This website is awesome!</h1><script src=\"https://hackyourcomputer.com\"></script>"
}
```

or

```
{
  "content":"<h1>This website is awesome!</h1><iframe src=\"https://hackyourcomputer.com\"></iframe>"
}
```

### To test XSS vulnerability
POST http://localhost:8081/
```
{
  "content":"<h1>This website is awesome!</h1><script> $('body').html('Your site has been hacked')</script>"
}
```

### NO-SQL Injection
DELETE http://localhost:8081/
```
{
  "content": {
    "$gt": ""
  }
}
```

Proper trigger:
```
{
  "id": "123"
}
```

# DDoS

```
npm run loadtest (in other terminal)
```


## In case of any questions please reach out to me via Facebook/GitHub


##### BTW. this readme file was made in Markdown, you can try it on your own
