var jQuery = require('jquery');
var Fix = require('./fix');
var Server = require('./server');

var results = [{}];

jQuery(function ($) {
  if(!results || results.length === 0) {
    $('#no-fix').removeClass('hidden');
    $('#table-fix').addClass('hidden');
  } else {
    $('#no-fix').addClass('hidden');
    $('#table-fix').removeClass('hidden');
  }

  $("#search").val(window.location.search.split("=")[1]);

  $('#new-fix').on('click', function () {
    var fix = new Fix({
      name: $("#search").val(),
      version: '0.1.0', // TODO
      domain: $("#domain").val(),
      subdomains: $("#subdomains").is(':checked'),
      page: $("#page").val(),
      protocols: $("#protocols").val() === '' ? [] : $("#protocols").val().split(',')
    });
    fix.code = $('#code').val();

    console.log(fix);
    Server.create(fix).done(function (cfix) {
      console.log('created!!');
      console.log('-------------------');
      console.log(cfix);
    });
  });
});
