var Q = require('q');

var get = function () {
  var deferred = Q.defer();

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url === 'string', 'tab.url should be a string');

    deferred.resolve(url);
  });

  return deferred.promise;
};

module.exports = { get : get };
