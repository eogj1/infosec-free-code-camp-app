const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet.hidePoweredBy());

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
