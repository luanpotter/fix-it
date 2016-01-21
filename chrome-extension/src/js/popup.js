var jQuery = require('jquery');
var URI = require('urijs');
var keypair = require('keypair');

var util = require('./util');
var Server = require('./server');

jQuery(function ($) {
  util.currentUrl(function(url) {
    var domain = URI(url).hostname();
    $('#new').on('click', function () {
      $('#result').text($('#result').text() + keypair().public);
      if(Math.pow(2, 1)===2) {return;}
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
