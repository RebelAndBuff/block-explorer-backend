import fs from 'fs';
import mongoose from 'mongoose';
import db from '../lib/database.js';
import rpc from '../lib/rpc.js';
import Block from '../models/Block.js';
import BlockHeader from '../models/BlockHeader.js';

let mode = 'update';
let database = 'index';

// displays usage and exits
function usage() {
  console.log('Usage: node scripts/sync.js [database] [mode]');
  console.log('');
  console.log('database: (required)');
  console.log(
    'index [mode] Main index: coin info/stats, transactions & addresses',
  );
  console.log(
    'market       Market data: summaries, orderbooks, trade history & chartdata',
  );
  console.log('');
  console.log('mode: (required for index database only)');
  console.log('update       Updates index from last sync to current block');
  console.log(
    'check        checks index for (and adds) any missing transactions/addresses',
  );
  console.log(
    'reindex      Clears index then resyncs from genesis to current block',
  );
  console.log('');
  console.log('notes:');
  console.log(
    "* 'current block' is the latest created block when script is executed.",
  );
  console.log(
    '* The market database only supports (& defaults to) reindex mode.',
  );
  console.log(
    '* If check mode finds missing data(ignoring new data since last sync),',
  );
  console.log('  index_timeout in settings.json is set too low.');
  console.log('');
  process.exit(0);
}

// check options
if (process.argv[2] == 'index') {
  if (process.argv.length < 3) {
    usage();
  } else {
    switch (process.argv[3]) {
      case 'update':
        mode = 'update';
        break;
      case 'check':
        mode = 'check';
        break;
      case 'reindex':
        mode = 'reindex';
        break;
      case 'reindex-rich':
        mode = 'reindex-rich';
        break;
      default:
        usage();
    }
  }
} else if (process.argv[2] == 'market') {
  database = 'market';
} else {
  usage();
}

export async function updateBlockHeaders(cb) {
  // block headers contain a resumed but important info of a block. Used for 'latest blocks section'.
  console.log('Updating block headers...');

  // find last block header height/index saved and start updating from there
  let amountOfBlockHeadersToProcess: number = 500;
  const blockcount = await rpc.fetchBlockcount();
  console.log(blockcount);

  const blocksHeadersExist = await BlockHeader.findOne();
  if (blocksHeadersExist) {
    const lastBlockHeaderSaved = await BlockHeader.find()
      .sort('-height')
      .limit(1)
      .exec();
    amountOfBlockHeadersToProcess = blockcount - lastBlockHeaderSaved[0].height;
  }

  if (amountOfBlockHeadersToProcess > 0) {
    let blockHeaders = [];
    // get blocks starting from blockcount and then down
    console.time('Algo time');
    for (
      let index = blockcount;
      index > blockcount - amountOfBlockHeadersToProcess;
      index--
    ) {
      let dbBLock = await db.createBlockHeader(index);
      blockHeaders.push(dbBLock);
      console.log(`Block ${index} fetched`);
    }
    console.timeEnd('Algo time');
    console.log('Saving blocks...');
    console.time('Saving time');
    await BlockHeader.insertMany(blockHeaders);
    const amountOfBlockHeadersInDB = await BlockHeader.countDocuments({});
    const amountOfBlockHeadersToKeep = 500;
    if (amountOfBlockHeadersInDB > 500) {
      // keep only 500 blocks in the db to save space
      console.log('Deleting unused block headers...');
      const { deletedCount } = await BlockHeader.deleteMany({
        height: { $lt: blockcount - amountOfBlockHeadersToKeep },
      });
      console.log(`${deletedCount} block(s) deleted`);
    }
    console.timeEnd('Saving time');
    console.log(`${blockHeaders.length} block header(s) saved!`);
  } else {
    console.log('Block headers are up to date.');
    return cb();
  }
  console.log('-------------- Block headers updated -----------------');
  cb();
}

// MAKE THIS FASTER, USE BATCHES OR JS WORKERS.
export async function updateBlocks() {
  // block headers contain a resumed but important info of a block. Used for 'latest blocks section'.
  console.log('Updating blocks...');

  // find last block height/index saved and start updating from there
  let limit = 10;
  let initialIndex = 1;
  const blockcount = await rpc.fetchBlockcount();

  const blocksExist = await Block.findOne();
  if (blocksExist) {
    const lastBlockSaved = await Block.find().sort('-height').limit(1).exec();
    initialIndex = lastBlockSaved[0].height + 1;
  }

  let amountOfBlocksLeftToProcess = blockcount - initialIndex;
  if (amountOfBlocksLeftToProcess > 0) {
    let blocks = [];
    console.time('Algo time');
    for (let index = blockcount; index > blockcount - limit; index--) {
      let dbBLock = await db.createBlock(index);
      blocks.push(dbBLock);
      console.log(`Block ${index} fetched`);
    }
    console.timeEnd('Algo time');
    console.log('Saving blocks...');
    console.time('Saving time');
    await Block.insertMany(blocks);
    console.timeEnd('Saving time');
    console.log(`${blocks.length} blocks saved!`);
  } else {
    console.log('Block are up to date.');
    return exit();
  }
  console.log('-------------------- Blocks updated -----------------');
  exit();
}

export async function updateDb() {
  console.log('Updating db...');
  updateBlockHeaders(updateBlocks);
}

function createLock(cb) {
  console.log('creating lock...');
  const fname = './tmp/' + database + '.pid';
  fs.appendFile(fname, process.pid.toString(), (err) => {
    if (err) {
      console.log(err);
      console.log('Error: unable to create %s', fname);
      process.exit(1);
    }
    console.log('script launched with pid: ' + process.pid);
    cb();
  });
}

function removeLock() {
  const fname = './tmp/' + database + '.pid';
  fs.unlink(fname, function (err) {
    if (err) {
      console.log('unable to remove lock: %s', fname);
      process.exit(1);
    }
    console.log(`${fname} was deleted`);
  });
}

function isLocked() {
  const fname = './tmp/' + database + '.pid';
  return fs.existsSync(fname);
}

async function exit() {
  removeLock();
  try {
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

if (isLocked()) {
  console.log('Script already running..');
  process.exit(0);
} else {
  mongoose
    .connect('mongodb://127.0.0.1:27017/explorer-db', {
      serverSelectionTimeoutMS: 5000,
    })
    .catch((err) => {
      console.log(err, 'Unable to connect to database');
      process.exit(1);
    });

  createLock(updateDb);
}

process.on('SIGINT', function () {
  exit();
});
