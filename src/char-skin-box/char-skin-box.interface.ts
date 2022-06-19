// 皮肤
export interface CharSkinBox extends Document {
  id: string;
  userId: string; // 创建的时候保存，不可更改，永远不返回
  charSkinKeys: string[]; // 持有的干员皮肤 keys
  updatedDate: string; // 更新日期
}
