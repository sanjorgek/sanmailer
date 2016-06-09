# sanmailer
Nodemailer adapter

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]

## Config
~~~bash
$ npm install sanmailer 
~~~

You need a configuration
~~~js
var mailerConf = {
  host: 'some.valid.host.com',
  port: 587,
  debug: false,
  auth: {
    user: 'username',
    pass: 'password'
  }  
};
~~~
Then you create a mailer
~~~js
var mailer = require('sanmailer')(mailerConf);
~~~

## Use
You have two methods

### sendMail
~~~js
mailer.sendMail(
  '<from@mail.com>',
  'to@mail.com',
  'Subject',
  'body',
  {
    replyTo: ['mail1@mail.com', 'mail2@mail.com']
  },
  function(error, info){
    //handle
  }
);
~~~

### checkMail
~~~js
if(mailer.checkEmail(req.body.sEmail)){
  //do stuf  
}
~~~

[npm-image]: https://img.shields.io/npm/v/sanmailer.svg
[npm-url]: https://npmjs.org/package/sanmailer
[downloads-image]: https://img.shields.io/npm/dm/sanmailer.svg
[downloads-url]: https://npmjs.org/package/sanmailer
