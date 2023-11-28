import { Document, model, Schema } from 'mongoose';

export interface IBLockHeader extends Document {
  height: number;
  hash: string;
  date: Date;
  transactions: number;
  valueOut: number;
  coinsCreated: number;
}

const blockHeaderSchema = new Schema<IBLockHeader>(
  {
    height: Number,
    hash: String,
    date: Date,
    transactions: Number,
    valueOut: Number,
    coinsCreated: Number,
  },
  { versionKey: false },
);

const BlockHeader = model('Blockheader', blockHeaderSchema);
export default BlockHeader;
