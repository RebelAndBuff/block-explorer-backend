export interface Block {
  height: number;
  hash: string;
  date: Date;
  transactions: Tx[];
  valueOut: number;
  supply: number;
  coinsCreated: number;
}

export interface RawBlock extends Omit<Block, 'transactions' | 'supply'> {
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: Tx['txid'][];
  time: number;
  meadiantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number; // amount of txs
  previousblockhash: string;
  nextblockhash: string;
}

export interface Tx {
  txid: string;
  address: string;
  total: number;
  blockHash: Block['hash'];
  blockHeight: Block['height'];
  blockDate: Block['date'];
  timestamp: number;
  confirmations: number;
  fees?: number; // non-mining tx? use fees
  delta?: number; // mining tx? use delta (amount of coins created)
  inputs: TxInput[];
  outputs: TxOutput[];
  vout: any; // figure what the heck is this
  vin: any; // same ^
}

export interface RawTx extends Tx {
  version: number;
  size: number;
  vsize: number;
  locktime: number;
}

export interface TxInput {
  index: number;
  previousOutput: string;
  address: string;
  amount: number;
}

export interface TxOutput {
  index: number;
  redeemedIn: string;
  address: string;
  amount: number;
}

export interface Address {
  address: string;
  balance: number;
  rank?: number;
  transactionCount: number;
  received: number;
  sent: number;
}

interface AddressInTx {
  address: Address['address'];
  blockindex: Block['height'];
  txid: Tx['txid'];
  amount: Tx['total'];
}
