(function () {
  $(document).ready(function () {
    var url = document.URL;
    console.log(url);
    chrome.runtime.sendMessage({ method: 'getFix', name: 'loghue' }, function(response) {
      eval(response.value);
    });
  });
}());
