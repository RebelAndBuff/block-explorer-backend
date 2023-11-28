import { Document, model, Schema } from 'mongoose';

export interface ITx extends Document {
  txid: string;
  address: string;
  total: number;
  blockHash: string;
  blockHeight: number;
  blockDate: Date;
  timestamp: number;
  confirmations: number;
  fees?: number; // not a mining tx? use fees instead
  delta?: number; // tx was a mining tx, delta = amount of coins created
  //   inputs: TxInput[];
  //   outputs: TxOutput[];
  vout: any; // figure what the heck is this
  vin: any; // same ^
}

const txSchema = new Schema<ITx>({
  txid: String,
  address: String,
  blockHash: String,
  blockHeight: Number,
  blockDate: Date,
  timestamp: Number,
  confirmations: Number,
  fees: Number,
  delta: Number,
  vout: Number,
  vin: Number,
});

const Tx = model('Tx', txSchema);
export default Tx;
