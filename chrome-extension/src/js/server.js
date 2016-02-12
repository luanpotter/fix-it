var yawp = require('yawp-cli');
var Q = require('q');
var _ = require('lodash');

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
  subdomains.push('');

  var requireSubs = false;
  var promises = subdomains.map(function () {
    var req = api.where('domain', '=', domain);
    if (requireSubs) {
      req = req.where('subdomains', '=', true);
    }
    requireSubs = true;
    var deferred = Q.defer();
    req.list().done(function (result) {
      deferred.resolve(result);
    }).error(function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  });

  Q.all(promises).then(function (results) {
    callback(_.uniqWith(_.flatten(results), function (o1, o2) {
      return _.isEqual(o1.name, o2.name);
    }));
  });
};

module.exports = api;

