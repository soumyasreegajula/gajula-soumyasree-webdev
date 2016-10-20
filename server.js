var express = require('express');
var app = express();



// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var ipaddress = process.env.IP;
var port      = process.env.PORT || 3000;
app.listen(port);
