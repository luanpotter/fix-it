var yawp = require('yawp-cli');
var server = 'http://fixit-server.appspot.com/api';

yawp.config(function (c) {
  c.baseUrl(server);
});

var api = yawp('/fix');

api.find = function (domain, callback) {
  api.where('domain', '=', domain).list(callback);
};

module.exports = api;

