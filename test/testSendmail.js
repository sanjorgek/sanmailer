var sanmailer;


describe('sanmailer in local mode', function() {
  before(function() {
    sanmailer = require('../index').local();
  });
  
  describe('sendMail', function () {
    it("empty from email", function (done) {
      sanmailer.sendMail(
        '',
        'to@mail.com',
        'Subject',
        'body',
        {},
        function(err, info) {
          done(err.message!='node-email error: from is required');
        }
      );
    });
    
    it("bad from email", function (done) {
        sanmailer.sendMail(
          'fefrefger',
          'to@mail.com',
          'Subject',
          'body',
          {},
          function(err, info) {
            done(err.message!='node-email error: invalid email address : fefrefger');
          }
        );
    });
    
    it("empty to email", function (done) {
      sanmailer.sendMail(
        'fefrefger@mail.com',
        '',
        'Subject',
        'body',
        {},
        function(err, info) {
          done(err.message!='node-email error: to is required');
        }
      );
    });
    
    it("bad to email", function (done) {
      sanmailer.sendMail(
        'fefrefger@mail.com',
        '@mail.com',
        'Subject',
        'body',
        {},
        function(err, info) {
          done(err.message!='node-email error: invalid email address : @mail.com');
        }
      );
    });
    
    it("bad subject", function (done) {
      sanmailer.sendMail(
        'fefrefger@mail.com',
        'dvverw@mail.com',
        '',
        'body',
        {},
        function(err, info) {
          done(err.message!='node-email error: subject is required');
        }
      );
    });
    
    it("OK", function (done) {
      sanmailer.sendMail(
        'fefrefger@mail.com',
        'dvverw@mail.com',
        'subject',
        '',
        {},
        function(err, info) {
          console.log(err.message);
          done(err.message!='node-email error: subject is required');
        }
      );
    });
  });
});