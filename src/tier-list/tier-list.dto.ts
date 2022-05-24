import { Logger } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsNumberString, IsString, MaxLength, ValidateNested } from 'class-validator';
import { TierList, Tier } from './tier-list.interface';
// tierList.dto.ts
class TierDTO {
  @IsString()
  name: string;
  @IsNumber()
  value: number;
  @IsString({each: true})
  characterKeys: string[];
}


/* 
  前端向后端create Update请求时，TierList的数据格式

*/
class TierListRequestDTO{
  //id由后端生成，前端无需包含
  //create 中没有id
  //update delete中有id
  readonly id?: string; //TierList id
  @IsString()
  readonly userId: string; //User id
  @IsString()
  readonly name: string; //// List 名称
  @IsString()
  readonly key: string; //权重

  @IsNumber()
  readonly value: number; //权重

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TierDTO)
  readonly tiers: TierDTO[]; //等级表
  //date由后端生成，前端无需包含
  // readonly createdDate: string; //
  // readonly updatedDate: string; //
}




/* getById 前端请求的数据格式 */
//获取一个用户所有的等级表
export class GetAllByUserIdRequestDTO{
  @IsString()
  public readonly userId: string; // User Id
}

/* getById 前端请求的数据格式 */
export class GetByIdRequestDTO{
  @IsString()
  public readonly id: string; //tierList id
}


/* CreateTierList 前端请求的数据格式 */
export class CreateTierListRequestDTO {
  @IsString() //IsString 包含了 IsEmpty的功能
  public readonly userId: string;
  @ValidateNested()
  @Type(() => TierListRequestDTO)
  public readonly tierList: TierListRequestDTO
}


/* getById 前端请求的数据格式 */
export class DeleteTierListRequestDTO{
  @IsString()
  public readonly id: string; //tierList id
}


/* UpdateTierList 前端请求的数据格式 */
export class UpdateTierListRequestDTO {
  @IsString()
  public readonly userId: string;

  @ValidateNested()
  @Type(() => TierListRequestDTO)
  public readonly tierList: TierListRequestDTO
}


/* 
  后端返回给前端时，TierList的数据格式
*/
export interface TierListDTO{
  readonly id: string; //TierList id
  readonly userId: string; //User id
  readonly name: string; //// List 名称
  readonly key: string; //?
  readonly value: number; //?
  readonly tiers: Tier[]; //等级表

  readonly createdDate: string; //
  readonly updatedDate: string; //
}



/*
  从TierList extends Documnet 格式化生成TierListDTO
*/
//有没有更方便的方法从已知类型提取属性到另一个类型？
export function formatTierListDTO(obj: TierList) {
  // const logger = new Logger(formatTierListDTO.name);
  // logger.debug(typeof(obj.value))
  const response: TierListDTO = {
    id: obj.id,
    userId: obj.userId,
    name: obj.name,
    key: obj.key,
    value: obj.value,
    tiers: obj.tiers,
    createdDate: obj.createdDate,
    updatedDate: obj.updatedDate,
    
  };
  return response;
}
