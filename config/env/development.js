'use strict';
// using this for temporary
//mongodb://ilias:ilias@kahana.mongohq.com:10046/iliastest

//we will use this for server testing
//mongodb://sevenmurinus:sevenmurinus@kahana.mongohq.com:10088/DiscountBaba

//we will use this for development
//mongodb://localhost/DiscountBaba

module.exports = {
    db: 'mongodb://sevenmurinus:sevenmurinus@kahana.mongohq.com:10088/DiscountBaba',
  mongoose: {
    debug: true
  },
  app: {
    name: 'MEAN - APP'
  },
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'hungry4discount.test@gmail.com', // sender address like ABC <abc@example.com>
  mailer: {
      service: 'smtp.gmail.com',
      port: "465",
      ssl: true,
    auth: {
      user: 'hungry4discount.test@gmail.com',
      pass: 'discount4baba'
    }
  }
};
