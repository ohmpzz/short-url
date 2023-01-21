import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import session from 'express-session';
import { mongoStoreSession } from 'v1/utils/mongo-session';
import crypto from 'crypto';

import v1Routes from './v1/routes';

export const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use((req, res, next) => {
  console.log(req.headers.origin);
  return next();
});
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'vscode-webview://0po70r6obgjum95ndotv3keatif71kimmp7j57od8ck709jtin7o',
      'https://short-url.ohmpiromrak.com',
    ],
    credentials: true,
  })
);

app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(
  session({
    name: 'sessionId',
    secret: '7176bb28-b7f7-4080-b929-156dfc1a5beb',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    store: mongoStoreSession,
    cookie: { maxAge: 60000 * 5, domain: 'localhost' },
    genid: function (req) {
      return crypto.randomUUID();
    },
  })
);

app.get('/healthcheck', (req, res) => {
  return res.send('working');
});

app.use('/v1', v1Routes);

process.on('uncaughtException', function (err) {
  // Handle the error safely
  console.log(err);
});

export default app;

declare module 'express-session' {
  interface SessionData {
    views: number;
  }
}
