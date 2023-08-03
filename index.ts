import { start_extraction_workers } from "./src/extraction_worker/start_workers";
import connectWithRetry from "./src/utils/db";

require("dotenv").config();

const mongoDB = process.env.MONGO_DB_URL;

connectWithRetry(mongoDB);