const express = require('express');
const helmet = require('helmet');
const app = express();
const timeInSeconds = 90*24*60*60;
const bcrypt = require("bcrypt")

// app.use(helmet()) automatically includes middleware
app.use(helmet({
  contentSecurityPolicy: { // prevents any unintended injection
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com'], 
    },
  noCache: true //  Disables caching for increased security (may decrease performance).
  },
  hsts: {
    maxAge: timeInSeconds, force: true 
  },
  dnsPrefetchControl: false
}));

module.exports = app;
const api = require('./server.js');
app.disable('strict-transport-security');
app.use(express.static('public'));

app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Info Sec App started on Port ${port}`);
});