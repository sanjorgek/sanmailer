# sanmailer
Nodemailer adapter

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
if(mailer.checkEmail.test(req.body.sEmail)){
  //do stuf  
}
~~~
