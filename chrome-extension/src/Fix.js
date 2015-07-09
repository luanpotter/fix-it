var FixIt = FixIt || {};

FixIt.Fix = function (args) {
  this.name = args.name;
  this.version = args.version;

  this.domain = args.domain; // exact domain string, like google.com
  this.subdomains = args.subdomains; // allow subdomains of the given domain
  this.page = new RegExp(args.page, 'i'); // this is a regex for the page (e.g., /asd/etc/.*\.html)
  this.protocols = args.protocols; // list of valid protocols; if empty, all allowed
};

FixIt.Fix.prototype.matches = function (url) {
 return true;
};
