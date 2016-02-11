var Fix = require('./fix');
var Server = require('./server');
var URI = require('urijs');

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

  var getFix = function(name, callback) {
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

FixIt.findRegisteredFixes = function(url, callback) {
  chrome.storage.sync.get('fixes', function (result) {
    var fixes = result.fixes;
    callback(fixes.map(function (obj) {
      return new Fix(obj);
    }).filter(function (fix) {
      return fix.matches(url);
    }));
  });
};

FixIt.findAvailableFixes = function(url, callback) {
  Server.find(URI(url).domain(), callback);
};

FixIt.clearFixes = function (callback) {
  chrome.storage.sync.set({ fixes : [] }, callback);
};

FixIt.registerFix = function(fix, callback) {
  chrome.storage.sync.get('fixes', function (result) {
    if (!result.fixes) {
      result.fixes = [];
    }
    result.fixes.push(fix);
    chrome.storage.sync.set(result, callback);
  });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method === "fixtures") {
    var sendMessage = function () {
      sendResponse({ status : 'done' });
    };
    var registerFix = function () {
      FixIt.registerFix({
        name: 'Hue Logger',
        version: '0.0.1',

        domain : '',
        subdomains: true,
        page: '.*',
        protocols: ['http']
      }, sendMessage);
    };
    FixIt.clearFixes(registerFix);
    return true;
  } else if (request.method === "findFixes") {
    FixIt.findRegisteredFixes(request.url, function (results) {
      sendResponse({ fixes : results });
    });
    return true;
  } else if (request.method === "getFix") {
    FixIt.getFix(request.name, function (result) {
      sendResponse({ fix : result });
    });
    return true;
  }
});

module.exports = FixIt;
