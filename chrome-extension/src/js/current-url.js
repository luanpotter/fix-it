var Q = require('q');

var get = function () {
  var deferred = Q.defer();

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    deferred.resolve(tabs[0].url);
  });

  return deferred.promise;
};

module.exports = { get : get };
