import * as dotenv from 'dotenv';
dotenv.config();
if (process.env.NODE_ENV == 'production') {
  const moduleAlias = require('module-alias');
  moduleAlias.addAliases({
    src: __dirname + '/',
    v1: __dirname + '/v1',
  });
}
import { createServer } from './server';
import app from './app';

createServer(app);
