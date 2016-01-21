var URI = require('urijs');
var util = require('./util');

var Fix = function (args) {
  this.name = args.name;
  this.version = args.version;

  this.domain = args.domain; // exact domain string, like google.com
  this.subdomains = args.subdomains; // allow subdomains of the given domain
  this.page = new RegExp(args.page, 'i'); // this is a regex for the page (e.g., /asd/etc/.*\.html)
  this.protocols = args.protocols; // list of valid protocols; if empty, all allowed
};

var api = Fix.prototype;

api.matches = function (urlString) {
  var self = this;

  var matchesProtocol = function (url) {
    return self.protocols.length === 0 || self.protocols.indexOf(url.scheme()) !== -1;
  };

  var matchesDomain = function (url) {
    var urlDomain = url.hostname();
    return self.subdomains ? util.endsWith(urlDomain, self.domain) : urlDomain === self.domain;
  };

  var matchesPage = function (url) {
    return self.page.test(url.path());
  };

  var url = URI(urlString);
  return matchesProtocol(url) && matchesDomain(url) && matchesPage(url);
};

module.exports = Fix;
