import { Document, model, Schema } from 'mongoose';
import { Transaction } from '../types/rpc.types.js';

export interface IBlock extends Document {
  height: number;
  hash: string;
  date: Date;
  nTx: number;
  valueOut: number;
  coinsCreated: number;
  difficulty: number;
  txs: Transaction[];
  prevBlockhash: string;
}

const blockSchema = new Schema<IBlock>(
  {
    height: Number,
    hash: String,
    date: Date,
    nTx: Number,
    difficulty: Number,
    prevBlockhash: String,
    valueOut: Number,
    coinsCreated: Number,
    txs: Array,
  },
  { versionKey: false },
);

const Block = model('Block', blockSchema);
export default Block;
