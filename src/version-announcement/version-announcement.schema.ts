import { Schema } from 'mongoose';

export const versionAnnouncementSchema = new Schema({
  version: { type: String, required: true },
  lang: { type: String, required: true },
  overview: { type: String, required: true },
  descriptions: { type: Array, required: true },
});
