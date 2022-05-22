import { Schema } from 'mongoose';

export const tierListSchema = new Schema({
  id: { type: String, required: true }, //等级表唯一id
  userId: { type: String, required: true }, //
  name: { type: String, required: true }, //等级表名称
  key: { type: String, required: true }, //等级表key
  value: { type: String, required: true }, //权重
  // 这样会为每个tier生成_id，
  // tiers: [{
  //   name : { type: String, required: true },
  //   value : { type: Number, required: true },
  //   characterKeys: [{type: String}], //create default empty array
  // }], //create default empty array
  tiers: {type: Array, required: true},
  createdDate: { type: String, required: true },
  updatedDate: { type: String, required: true },
});
