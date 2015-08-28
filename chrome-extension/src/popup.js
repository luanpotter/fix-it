(function () { 
  document.addEventListener('DOMContentLoaded', function() {
    FixIt.util.currentUrl(function(url) {
      FixIt.Server.list(url, function (r) {
        document.getElementById('result').innerHTML = url + ':' + r;
      });
    });
  });
}());
