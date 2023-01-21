import mongoose from 'mongoose';

export default function ConnectDatabase() {
  mongoose
    .connect(process.env.DATABASE_URI || '', {
      maxPoolSize: 5,
      autoIndex: true,
    })
    .then(() => {
      console.log('db connected');
    })
    .catch((e) => {
      console.log('connect error');

      console.log(e);
    });

  mongoose.set('strictQuery', true);
}
