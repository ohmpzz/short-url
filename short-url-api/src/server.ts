import { Express } from 'express';
import connectDatabase from './connect-database';
import mongoose from 'mongoose';

export function createServer(app: Express) {
  const server = app.listen(process.env.PORT, () => {
    console.log(`listening port: ${process.env.PORT}`);
    connectDatabase();
  });

  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
      console.log('Http server closed.');
      // boolean means [force], see in mongoose doc
      mongoose.connection.close(false, () => {
        console.log('MongoDb connection closed.');
        process.exit(0);
      });
    });
  });
}

export default createServer;
