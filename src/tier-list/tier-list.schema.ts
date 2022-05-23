import { Schema } from 'mongoose';

const tier = new Schema({
    name : { type: String, required: true },
    value : { type: Number, required: true },
    characterKeys: [{type: String}], //create default empty array
  },
  {_id:false} //  不需要为每个tier生成 _id
)

export const tierListSchema = new Schema({
  id: { type: String, required: true }, //等级表唯一id
  userId: { type: String, required: true }, //
  name: { type: String, required: true }, //等级表名称
  key: { type: String, required: true }, //等级表key
  value: { type: Number, required: true }, //权重
  tiers: [{type: tier}], //create default empty array
  // tiers: {type: Array, required: true},
  createdDate: { type: String, required: true },
  updatedDate: { type: String, required: true },
});
