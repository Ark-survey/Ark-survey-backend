import { Schema } from 'mongoose';

export const userSchema = new Schema({
  id: { type: String, required: true },
  password: { type: String, required: false },
  createdIp: { type: String, required: true },
  createdDate: { type: String, required: true },
  updatedIp: { type: String, required: true },
  updatedDate: { type: String, required: true },
});
