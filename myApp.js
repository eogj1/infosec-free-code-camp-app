const express = require('express');
const helmet = require('helmet');
const app = express();

// hidePoweredBy hides express as it is vulnerable
app.use(helmet.hidePoweredBy());
// frameguard secures against framing to prevent clickjacking
app.use(helmet.frameguard({
  action: 'deny'
}));
// xssFilter helps protect against XSS attacks
app.use(helmet.xssFilter());
// noSniff instructs the browser to not bypass the provided Content-type
app.use(helmet.noSniff());

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
