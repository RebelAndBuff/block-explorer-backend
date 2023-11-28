import { Document, model, Schema } from 'mongoose';

export interface IAddress extends Document {
  address: string;
  received: number;
  sent: number;
  balance: number;
}

const addressSchema = new Schema<IAddress>({
  address: String,
  received: Number,
  sent: Number,
  balance: Number,
});

const Address = model('Address', addressSchema);
export default Address;
