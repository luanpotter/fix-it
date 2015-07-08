(function () { 
  document.addEventListener('DOMContentLoaded', function() {
    FixIt.util.currentUrl(function(url) {
      document.getElementById('result').innerHTML = url;
    });
  });
}());
