(function () { 
  var getCurrentTabUrl = function(callback) {
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
  }

  document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {
      document.getElementById('result').innerHTML = url;
    });
  });
}());
