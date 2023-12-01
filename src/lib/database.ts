import Block, { IBlock } from '../models/Block.js';
import BlockHeader, { IBLockHeader } from '../models/BlockHeader.js';
import rpc, { fetchBlock, fetchBlockstats, fetchRawtransction } from './rpc.js';

const freitoshi = 0.00000001;

export async function createBlockHeader(index: number) {
  try {
    const blockstats = await fetchBlockstats(index);
    const blockheader = {
      height: blockstats.height,
      hash: blockstats.blockhash,
      date: new Date(blockstats.time * 1000), // we multipy it by 1000 becuase it's an EPOCH time
      transactions: blockstats.txs - 1, //  we substract one because the coinbase tx counts as 2 separate txs for some reason.
      valueOut: blockstats.total_out * freitoshi,
      coinsCreated: blockstats.subsidy * freitoshi,
    };
    return blockheader;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export async function createTxHeader(txHash: string) {
  const rawTx = await fetchRawtransction(txHash);
  const txHeader = {
    hash: rawTx.hash,
    valueOut: rawTx.vout
      .map((tx) => tx.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0), // sum all output values
    vin: rawTx.vin,
    vout: rawTx.vout,
  };

  return txHeader;
}

export async function createBlock(index: number) {
  const blockhash = await rpc.fetchBlockhash(index);
  const blockstats = await rpc.fetchBlockstats(index);

  const block = await fetchBlock(blockhash);

  const coinbaseTx = {
    // the coinbase tx is always the first one in the block
    txid: block.tx[0].txid,
    inputs: [{ txid: 'Generation + fees' }],
    outputs: [
      {
        value: block.tx[0].vout[0].value,
        type: block.tx[0].vout[0].scriptPubKey.type,
        addresses: block.tx[0].vout[0].scriptPubKey.addresses,
      },
      { value: 0, type: 'nonstandard' }, // OP_return
    ],
  };

  const serializedTxs =
    // if the amount of txs is bigger than 2, there are more txs than the coinbase. (coinbase tx takes the first two txs)
    block.tx.length > 2
      ? [
          coinbaseTx,
          block.tx.splice(0, 2).forEach((tx) => {
            // skip the first and second tx of each block, since we already declared the coinbase tx.
            return {
              txid: tx.txid,
              inputs: tx.vin.map((vin) => {
                return { txid: vin.txid };
              }),
              outputs: tx.vout.map((vout) => {
                return {
                  value: vout.value,
                  type: vout.scriptPubKey.type,
                  ...(vout.scriptPubKey.type !== 'nonstandard' && {
                    addresses: vout.scriptPubKey.addresses,
                  }),
                };
              }),
            };
          }),
        ]
      : [coinbaseTx];

  const serializedBlock = {
    height: block.height,
    hash: block.hash,
    date: new Date(block.time * 1000), // block date is in epoch time
    nTx: block.nTx - 1,
    difficulty: block.auxdifficulty,
    prevBlockhash: block.previousblockhash,
    valueOut: blockstats.total_out * freitoshi,
    coinsCreated: blockstats.subsidy * freitoshi,
    // txsa: block.nTx - 1 === 1 ? [block.tx[0]] : '',
    txs: serializedTxs,
  };

  return serializedBlock;
}

export async function getLatestBlocks(limit: number) {
  const latestBlocks: IBLockHeader[] = await BlockHeader.find()
    .limit(limit)
    .sort({ height: 'desc' });
  return latestBlocks;
}

export async function getBlock(id: string | number) {
  // id is a string? find by hash
  if (typeof id === 'string') {
    const block: IBlock = await Block.findOne({
      hash: id,
    }).exec();
    return block;
  } else {
    // find by height
    const block: IBlock = await Block.findOne({
      height: id,
    }).exec();
    return block;
  }
}

const db = {
  createBlockHeader,
  getLatestBlocks,
  getBlock,
  createBlock,
};

export default db;
