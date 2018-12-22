// bcrypt mongoose connect-mongo express-session mongoose

import mongoConnect from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';
import authRouter from './router/auth';
import loggingRouter from './router/logging';
import pageRouter from './router/page';
import userRouter from './router/user';
import { seed } from './service/data';

mongoose.Promise = global.Promise;

export default class Database {
  static init = app => {
    const MongoStore = mongoConnect(session);
    const mongoURI = process.env.KLAW_MONGOOSE_URI;
    const storeConfig = {
      mongooseConnection: mongoose.connection
    };
    const sessionConfig = {
      cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: false
      },
      name: 'TODO-session',
      resave: true,
      saveUninitialized: false,
      secret: process.env.KLAW_MONGOOSE_SECRET,
      store: new MongoStore(storeConfig)
    };

    mongoose.connection.on('connected', () => {
      console.log(`Mongoose default connection open to ${mongoURI}`); // tslint:disable-line:no-console
      seed();
    });

    mongoose.set('useCreateIndex', true);
    mongoose.connect(
      mongoURI,
      { useNewUrlParser: true }
    );

    app.use(session(sessionConfig));
    app.use(loggingRouter);
    app.use(authRouter);
    app.use(pageRouter);
    app.use(userRouter);
  };
}
