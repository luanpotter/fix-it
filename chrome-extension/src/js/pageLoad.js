var $ = require('jquery');
var send = chrome.runtime.sendMessage;

$(function () {
  var url = document.URL;

  console.log('howdy');

  send({
    method: 'findFixes',
    url: url
  }, function (fixesResponse) {
    console.log('Loading ' + fixesResponse.fixes.length + ' fixes');
    fixesResponse.fixes.forEach(function (fixData) {
      send({
        method: 'getFix',
        name: fixData.name
      }, function (fixResponse) {
        eval(fixResponse.fix); // jshint ignore:line
      });
    });
  });
});