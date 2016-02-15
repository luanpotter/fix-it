var Fix = require('./fix');
var Server = require('./server');
var URI = require('urijs');
var Q = require('q');

var FixIt = {};

FixIt.getFix = (function () {
  var saveFixToCache = function (name, value) {
    var map = {};
    map[name] = value;
    chrome.storage.local.set(map);
  };

  var fetchFix = function (name, callback) {
    var value = 'console.log(\'huehue' + Math.random() + '\');'; // TODO here fetch from server
    saveFixToCache(name, value);
    callback(value);
  };

  var getFix = function (name, callback) {
    chrome.storage.local.get(name, function (result) {
      if (result[name]) {
        callback(result[name]);
      } else {
        fetchFix(name, callback);
      }
    });
  };

  return getFix;
}());

FixIt.findAllFixes = function (url) {
  var deferred = Q.defer();
  var my = FixIt.findRegisteredFixes(url);
  var av = FixIt.findAvailableFixes(url);
  Q.all([my, av]).then(function (r) {
    deferred.resolve({
        mine : r[0],
        available : r[1]
    });
  });
  return deferred.promise;
};

FixIt.findRegisteredFixes = function (url) {
  var deferred = Q.defer();
  chrome.storage.sync.get('fixes', function (result) {
    var fixes = result.fixes || [];
    deferred.resolve(fixes.map(function (obj) {
      return new Fix(obj);
    }).filter(function (fix) {
      return fix.matches(url);
    }));
  });
  return deferred.promise;
};

FixIt.findAvailableFixes = function (url) {
  var deferred = Q.defer();
  Server.find(URI(url).domain(), function (list) {
    deferred.resolve(list.map(function (obj) {
      return new Fix(obj);
    }).filter(function (fix) {
      return fix.matches(url);
    }));
  });
  return deferred.promise;
};

FixIt.clearFixes = function (callback) {
  chrome.storage.sync.set({
    fixes: []
  }, callback);
};

FixIt.removeFix = function (fix, callback) {
  chrome.storage.sync.get('fixes', function (result) {
    if (!result.fixes) {
      result.fixes = [];
    }
    result.fixes = result.fixes.filter(function (fo) {
      return fo.name !== fix.name;
    });
    chrome.storage.sync.set(result, callback);
  });
};

FixIt.registerFix = function (fix, callback) {
  chrome.storage.sync.get('fixes', function (result) {
    if (!result.fixes) {
      result.fixes = [];
    }
    result.fixes.push(fix);
    chrome.storage.sync.set(result, callback);
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === "fixtures") {
    var sendMessage = function () {
      sendResponse({
        status: 'done'
      });
    };
    var registerFix = function () {
      FixIt.registerFix({
        name: 'Hue Logger',
        version: '0.0.1',

        domain: '',
        subdomains: true,
        page: '.*',
        protocols: ['http']
      }, sendMessage);
    };
    FixIt.clearFixes(registerFix);
    return true;
  } else if (request.method === "findFixes") {
    FixIt.findRegisteredFixes(request.url, function (results) {
      sendResponse({
        fixes: results
      });
    });
    return true;
  } else if (request.method === "getFix") {
    FixIt.getFix(request.name, function (result) {
      sendResponse({
        fix: result
      });
    });
    return true;
  }
});

module.exports = FixIt;
