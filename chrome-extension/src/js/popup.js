var jQuery = require('jquery');

var results = [{}];

jQuery(function ($) {
  if(!results || results.length === 0) {
    $('#no-fix').removeClass('hidden'); 
    $('#table-fix').addClass('hidden'); 
  } else {
    $('#no-fix').addClass('hidden'); 
    $('#table-fix').removeClass('hidden'); 
  }

  $('#btn-add-fix').on('click', function () {
    chrome.tabs.create({'url': chrome.extension.getURL('html/main.html')});
  });
});
