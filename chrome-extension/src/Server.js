FixIt = FixIt || {};

FixIt.Server = (function () {
  var server = 'http://fixit-server.appspot.com/api';

  yawp.config(function (c) {
    c.baseUrl(server);
  });

  var list = function (url, callback) {
    var domain = URI(url).hostname();
    yawp('/fix').where('domain', '=', domain).list(callback);
  };

  var create = function (obj) {
    yawp.save(obj);
  };

  return {
    list : list,
    create : create
  };

}());
