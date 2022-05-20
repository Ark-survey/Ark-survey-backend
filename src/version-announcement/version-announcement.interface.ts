import { Document } from 'mongoose';

export interface VersionAnnouncement extends Document {
  readonly version: string; // 版本
  readonly lang: string; // 语言
  readonly overview: string; // 概览
  readonly descriptions: string[]; // 描述
}
  
export interface VersionAnnouncementType {
  readonly version: string; // 版本
  readonly lang: string; // 语言
  readonly overview: string; // 概览
  readonly descriptions: string[]; // 描述
}
