var jQuery = require('jquery');
var util = require('./util');
var FixIt = require('./background');

util.currentUrl(function(url) {
  FixIt.findRegisteredFixes(url, function (myFixesList) {

    myFixesList = [ {  name : 'jquery', domain : '*'}, { name : 'react', domain: '*'} ]; // mock!

    jQuery(function ($) {
      var templateTable = $('#template-table').html();
      var templateTr = $('#template-tr').html();

      var makeTable = function (el, results) {
          var noResult = !results || results.length === 0;
          el.first('.no-fix').toggle(noResult);
          el.first('.table-fixes').hide();//.toggle(!noResult);
      };

      var createResult = function (result) {
          var tr = $(templateTr);
          tr.find('.name').text(result.name);
          tr.find('.date').text('-');
          tr.find('.domain').text(result.domain);
          return tr;
      };

      var myFixes = $(templateTable);
      myFixesList.forEach(function (result) {
          myFixes.find('tbody').append(createResult(result));
      });
      makeTable(myFixes, myFixesList);
      $('#my-fixes').append(myFixes);

      $('#btn-add-fix').on('click', function () {
        chrome.tabs.create({'url': chrome.extension.getURL('html/main.html')});
      });
    });
  });
});
