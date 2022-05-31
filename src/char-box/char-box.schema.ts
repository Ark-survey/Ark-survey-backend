import { Schema } from 'mongoose';

const module = new Schema({
    key : { type: String, required: true },
    level : { type: Number, required: true },
  },
  {_id:false} //  不需要为每个tier生成 _id
)

const skill = new Schema({
    key : { type: String, required: true },
    level : { type: Number, required: true }, //validation
  },
  {_id:false} //  不需要为每个tier生成 _id
)


export const character = new Schema({
  key: { type: String, required: true }, //等级表唯一id
  potentialLevel: { type: Number, required: true },
  elite: { type: Number, required: true },
  level: { type: Number, required: true },
  trust: { type: Number, required: true },
  skills: { //Record<角色名, charStatistic>
    type: Map, 
    of: skill,
    required: true
  }, 
  modules: { //Record<角色名, charStatistic>
    type: Map, 
    of: module,
    required: true
  }, 
  moduleUse: { type: String, required: true },
  skillUse: { type: String, required: true },
  favorite:  { type: Boolean, required: true },
},
{_id:false} //  不需要为每个tier生成 _id
);

export const charBox = new Schema({
    id: {type: String, required: true}, 
    userId: {type: String, required: true},
    characterKeys: { //Record<角色名, charStatistic>
        type: Map, 
        of: character,
        required: true,
      }, 
    updatedDate: { type: String, required: true },

  });