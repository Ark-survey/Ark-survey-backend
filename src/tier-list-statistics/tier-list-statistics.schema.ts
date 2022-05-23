import { Schema } from 'mongoose';

const charStatistic = new Schema({
    avgValue: {type: Number, required: true},
    count: {type: Number, required: true}, //所有有效的TierList中，每个角色被评价的次数
    distributions: {type: Array, required: true} //create default empty array
},
{_id:false}
)

const oneModeStatisticSchema = new Schema({
    count: {type: Number, required: true},
    validCount: { type: Number, required: true }, //等级表唯一id
    // charStatistics: { type: String, required: true }, //
    // 这样会为每个tier生成_id，
    charStatistics: { //Record<角色名, charStatistic>
      type: Map, 
      of: charStatistic,
      required: true
    }, 
    createdDate: { type: String, required: true },
  }, 
  {_id:false}
  );

//无法这样声明
//即使TS可以通过编译，但是Mongoose不识别
//db中存的数据只有两项：_id, _v
// export const allModeStatistics = new Schema({
//     type: Map,
//     of: oneModeStatisticSchema
// });

//只能这样声明
export const allModeStatistics = new Schema({
    data: {
      type: Map,
      of: oneModeStatisticSchema
    }
});


  