var nodemailer = require('nodemailer')
  ,Email = require('email').Email
	,debug = require('debug')('sanmailer');

var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

var sendMail = function (transporter) {
  return function (from, to, subject, body, options, cb) {
    var mailOp = {
      from: from,
      to: to,
      subject: subject,
      html: body
    }
    if(options.attachments) mailOp.attachments = options.attachments;
    if(options.replyTo) mailOp.replyTo = options.replyTo;
    if(options.text) mailOp.text = options.text;
    if(options.cc) mailOp.cc = options.cc;
    if(options.bcc) mailOp.bcc = options.bcc;
    if(options.sender) mailOp.sender = options.sender;
    if(options.inReplyTo) mailOp.inReplyTo = options.inReplyTo;
    if(options.references) mailOp.references = options.references;
    if(options.watchHtml) mailOp.watchHtml = options.watchHtml;
    if(options.headers) mailOp.headers = options.headers;
    if(options.raw) mailOp.raw = options.raw;
    if(options.encoding) mailOp.encoding = options.encoding;
    if(options.date) mailOp.date = options.date;
    if(options.messageId) mailOp.messageId = options.messageId;
    transporter.sendMail(mailOp, function(error, info){
      debug(error);
      debug(info);
      cb(error,info);
    });
  }
}

function initHost(config) {
  var transporter = nodemailer.createTransport(config);
  debug('Listo para enviar correos');
  return {
    checkEmail: pattern.test,
    sendMail: sendMail(transporter)
  };
}

function local() {
  debug("Init in local host");
  return {
    checkEmail: pattern.test,
    sendMail: function(from, to, subject, body, options, cb) {
      var mailJson = {
        from: from,
        to: to,
        subject: subject,
        body: body
      };
      if(options.replyTo) mailJson.replyTo = options.replyTo;
      if(options.cc) mailJson.cc = options.cc;
      if(options.bcc) mailJson.bcc = options.bcc;
      if(options.bcc) mailJson.bcc = options.bcc;
      if(options.bodyType) mailJson.bodyType = options.bodyType;
      if(options.timeout) mailJson.timeout = options.timeout;
      if(options.altText) mailJson.altText = options.altText;
      if(options.path) mailJson.altText = options.path;
      new Email(mailJson).send(function (err) {
        debug(err);
        cb(err);
      });
    }
  }
}

module.exports = {
  host: initHost,
  local: local  
};
