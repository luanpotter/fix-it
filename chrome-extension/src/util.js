var FixIt = FixIt || {};

FixIt.util = {};
FixIt.util.currentUrl = function(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
};

FixIt.util.endsWith = function(str, suffix) {
  if (suffix === '') {
    return true;
  }
  return str.slice(-suffix.length) === suffix;
};
