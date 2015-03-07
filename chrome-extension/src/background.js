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
    var value = 'console.log(\'huehue\')';
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
    var fixes = result['fixes'];
    callback(fixes.map(function (obj) {
      return new Fix(obj);
    }).filter(function (fix) {
      return fix.matches(url);
    }));
  });
};

FixIt.clearFixes = function () {
  chrome.storage.sync.set({ fixes : [] });
};

FixIt.registerFix = function(fix) {
  chrome.storage.sync.get('fixes', function (result) {
    if (!result['fixes']) {
      result['fixes'] = [];
    }
    result['fixes'].push(fix);
    chrome.storage.sync.set(result);
  });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method === "getFix") {
    FixIt.clearFixes();
    FixIt.registerFix({
      name: 'Hue Logger',
      version: '0.0.1',

      domain : '',
      subdomains: true,
      page: '.*',
      protocols: []
    });

    setTimeout(function () {
      FixIt.findRegisteredFixes('asdasd', function (fixes) { console.log('fixes', fixes); });
    }, 300);

    FixIt.getFix(request.name, function (value) {
      sendResponse({ value: value });
    });
    return true;
  }
});
