import { Schema } from 'mongoose';

export const metaDataSchema = new Schema({
  version: { type: String, required: true },
  imgUrlOrigin: { type: String, required: true },
});
