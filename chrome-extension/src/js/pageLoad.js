var $ = require('jquery');
var send = chrome.runtime.sendMessage;

$(document).ready(function () {
  var url = document.URL;

  send({
    method: 'findFixes',
    url: url
  }, function (fixesResponse) {
    console.log('Loading ' + fixesResponse.fixes.length + ' fixes');
    $.each(fixesResponse.fixes, function (_i, fixData) {
      console.log('fix', fixData);
      send({
        method: 'getFix',
        name: fixData.name
      }, function (fixResponse) {
        eval(fixResponse.fix); // jshint ignore:line
      });
    });
  });
});
