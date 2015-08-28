(function () { 
  //document.addEventListener('DOMContentLoaded', function() {
  jQuery(function ($) {
    FixIt.util.currentUrl(function(url) {
      var domain = URI(url).hostname();
      $('#new').on('click', function () {
        FixIt.Server.create({
          domain : domain
        }).done(function(person) {
          console.log('done', person);
        }).error(function(xhr, ajaxOptions, thrownError) {
          $('#result').text($('#result').text() + xhr.status);
          console.log(thrownError);
        });
      });
      FixIt.Server.find(domain, function (r) {
        $('#result').text(domain + ':' + r);
      });
    });
  });
}());
