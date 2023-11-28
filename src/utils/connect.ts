import mongoose from 'mongoose';
import log from './logger.js';

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/explorer-db', {
      serverSelectionTimeoutMS: 5000,
    });
    log.info('DB connected');
  } catch (error) {
    log.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
