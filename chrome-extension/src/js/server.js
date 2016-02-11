var yawp = require('yawp-cli');
var server = 'http://fixit-server.appspot.com/api';

yawp.config(function (c) {
  c.baseUrl(server);
});

var api = yawp('/fix');

api.find = function (domain, callback) {
  var acc = 0;
  var subdomains = domain.split('.').map(function (part) {
    acc += part.length;
    return domain.substr(acc++ - part.length, domain.length);
  });

  var allowSubs = false;
  subdomains.forEach(function () {
    console.log(allowSubs);
    // api.where('domain', '=', domain)
  });

  callback([{ name : 'for ' + domain, domain : domain  }]);
};

module.exports = api;

