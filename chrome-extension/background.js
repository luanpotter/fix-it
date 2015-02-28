var FixIt = (function () {
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

  return {
    getFix : getFix
  };
}());

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method === "getFix") {
     FixIt.getFix(request.name, function (value) {
       sendResponse({ value: value });
     });
     return true;
  }
});

