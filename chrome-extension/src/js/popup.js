var jQuery = require('jquery');
var util = require('./util');
var FixIt = require('./background');

util.currentUrl(function (url) {
  var makePopup = function () {
    FixIt.findRegisteredFixes(url, function (myFixesList) {
      FixIt.findAvailableFixes(url, function (availableFixesList) {

        jQuery(function ($) {
          var templateTable = $('#template-table').html();
          var templateTr = $('#template-tr').html();

          var makeTable = function (el, results) {
            var noResult = !results || results.length === 0;
            el.find('.no-fix').toggle(noResult);
            el.find('.table-fixes').toggle(!noResult);
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
            var tr = createResult(result);
            tr.on('click', function () {
              FixIt.removeFix(result, function () {
                console.log('callback');
                makePopup();
              });
            });
            myFixes.find('tbody').append(tr);
          });
          makeTable(myFixes, myFixesList);
          $('#my-fixes').html('').append(myFixes);

          var availableFixes = $(templateTable);
          availableFixesList.forEach(function (result) {
            var tr = createResult(result);
            tr.on('click', function () {
              FixIt.registerFix(result, function () {
                makePopup();
              });
            });
            availableFixes.find('tbody').append(tr);
          });
          makeTable(availableFixes, availableFixesList);
          $('#available-fixes').html('').append(availableFixes);

          $('#btn-add-fix').on('click', function () {
            chrome.tabs.create({
              'url': chrome.extension.getURL('html/main.html?search=' + $('#search').val())
            });
          });
        });
      });
    });
  };

  makePopup();
});
