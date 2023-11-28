import { Document, model, Schema } from 'mongoose';

export interface IAddressInTx extends Document {
  address: string;
  blockindex: Number;
  txid: String;
  amount: Number;
}

const addressInTxSchema = new Schema<IAddressInTx>({
  address: { type: String, index: true },
  blockindex: { type: Number, default: 0, index: true },
  txid: { type: String, lowercase: true, index: true },
  amount: { type: Number, default: 0, index: true },
});

const AddressInTx = model('AddressInTx', addressInTxSchema);
export default AddressInTx;
