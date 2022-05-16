import { Document } from 'mongoose';

export interface MetaData extends Document {
  readonly version: string; // List 唯一 ID
  readonly imgUrlOrigin: string; // 操作密码
}

export interface MetaDataType {
  readonly version: string; // List 唯一 ID
  readonly imgUrlOrigin: string; // 操作密码
  readonly needUpdate: boolean; // List 名称
}
