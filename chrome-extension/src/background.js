var FixIt = FixIt || {};

FixIt.getFix = (function () {
  var getFix = function(name, callback) {
    chrome.storage.local.get(name, function (result) {
      if (result[name]) {
        callback(result[name]);
      } else {
        fetchFix(name, callback);
      }
    });
  };

  var fetchFix = function (name, callback) {
    var value = 'console.log(\'huehue' + Math.random() + '\');';
    saveFixToCache(name, value);
    callback(value);
  };

  var saveFixToCache = function (name, value) {
    var map = {};
    map[name] = value;
    chrome.storage.local.set(map);
  };

  return getFix;
}());

FixIt.Fix = function (args) {
  this.name = args.name;
  this.version = args.version;

  this.domain = args.domain; // exact domain string, like google.com
  this.subdomains = args.subdomains; // allow subdomains of the given domain
  this.page = new RegExp(args.page, 'i'); // this is a regex for the page (e.g., /asd/etc/.*\.html)
  this.protocols = args.protocols; // list of valid protocols; if empty, all allowed
};

FixIt.Fix.prototype.matches = function (url) {
 return true;
};

var Fix = FixIt.Fix;

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
        protocols: []
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
