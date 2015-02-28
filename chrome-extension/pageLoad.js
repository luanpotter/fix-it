(function () {
  $(document).ready(function () {
    chrome.runtime.sendMessage({ method: 'getFix', name: 'loghue' }, function(response) {
      eval(response.value);
    });
  });
}());
