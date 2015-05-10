var app = require('./server/server-config.js');
var port = process.env.PORT || 4568;
console.log(process.env);
console.log(process.env.ClientID);
console.log(process.env.ClientSecret);
app.listen(port);
console.log('Server now listening on port ' + port);