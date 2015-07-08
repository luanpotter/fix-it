(function () {
  var send = chrome.runtime.sendMessage;

  $(document).ready(function () {
    var url = document.URL;
    console.log(url);

    send({ method: 'fixtures' }, function (response) {
      console.log('fixtures', response.status);
      send({ method: 'findFixes', url: url }, function (fixesResponse) {
        $.each(fixesResponse.fixes, function(_i, fixData) {
          console.log('fix', fixData);
          send({method: 'getFix', name: fixData.name }, function (fixResponse) {
             eval(fixResponse.fix);
          });
        });
      });
    });
  });
}());
