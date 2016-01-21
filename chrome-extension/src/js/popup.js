var jQuery = require('jquery');
var URI = require('urijs');
var keypair = require('keypair');

var util = require('./util');
var Server = require('./server');

//document.addEventListener('DOMContentLoaded', function() {

jQuery(function ($) {
  util.currentUrl(function(url) {
    var domain = URI(url).hostname();
    console.log('asd');
    $('#new').on('click', function () {
      console.log('hereeeeee');
      console.log(keypair());
      Server.create({
        domain : domain
      }).done(function(person) {
        console.log('done', person);
      }).error(function(xhr, ajaxOptions, thrownError) {
        $('#result').text($('#result').text() + xhr.status);
        console.log(thrownError);
      });
    });
    Server.find(domain, function (r) {
      $('#result').text(domain + ':' + r);
    });
  });
});
