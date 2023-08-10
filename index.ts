import connectWithRetry from './src/utils/db';

require('dotenv').config();

const mongoDB = process.env.MONGO_DB_URL;

connectWithRetry(mongoDB);
