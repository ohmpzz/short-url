import MongoStore from 'connect-mongo';

export let DATABASE_URI = process.env.DATABASE_URI || '';

export const setDatabaseUri = (uri: string) => {
  DATABASE_URI = uri;
};

export const mongoStoreSession = MongoStore.create({
  mongoUrl: DATABASE_URI,
});
