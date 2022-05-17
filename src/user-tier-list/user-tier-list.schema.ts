import { Schema } from 'mongoose';

export const userTierListSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: false },
  type: { type: String, required: true },
  tierList: { type: Array, required: true },
  createdIp: { type: String, required: true },
  createdDate: { type: String, required: true },
  updatedIp: { type: String, required: true },
  updatedDate: { type: String, required: true },
});
