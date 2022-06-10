import { Type } from "class-transformer";
import { IsInt, IsNumber, isNumber, IsString, Max, Min, ValidateNested } from "class-validator";
import {  CharBox } from "./char-box.interface";
import { character, charBox } from "./char-box.schema";

//不export，仅在DTO文件中做类型检查
class Module{
    // @IsString()
    key: string;
    // @IsInt()
    // @Max(3)
    // @Min(1)
    level: number;
}
class Skill{
    // @IsString()
    key: string;
    // @IsInt()
    // @Max(10)
    // @Min(1)
    level: number;
}
class Character{
    // @IsString()
    key: string;
    // @IsNumber()
    // @Max(6)
    // @Min(0) //0潜1潜
    potentialLevel: number;
    elite: number;
    level: number;
    trust: number;
    skills: Record<string, Skill>;
    modules: Record<string, Module>;
    moduleUse: string;
    skinUse: string;
    skillUse: string;
    favorite:  boolean;
}


/**
 * 创建CharBox
 * 合法性判断：
 *      userId在charbox中不重复
 *      userId在User中存在
 *  
 */
export class CreateCharBoxDTO{
    // id?: string; //createOne不需包含，updateOne需要包含
    @IsString()
    userId: string; 
    // @ValidateNested({each: true})
    // @Type(() => Character)
    /**
     * TODO 怎么对Record做类型检查？内置validator不支持Record
     * */
    characterKeys: Record<string, Character>;
}
 export class CreateOneRequestDTO{
    @ValidateNested({each: true})
    @Type(() => CreateCharBoxDTO)
    charBox: CreateCharBoxDTO;
}

/**
 * 更新CharBox
 * 合法性判断：
 *      DTO中id对应的charbox中的userId匹配
 *      （无需判断，createOne已保证）userId在User中存在
 *      
 *  
 */
export class UpdateCharBoxDTO{
    @IsString()
    id: string; //createOne不需包含，updateOne需要包含
    @IsString()
    userId: string; 
    characterKeys: Record<string, Character>;
}
 export class UpdateOneRequestDTO{
    @ValidateNested({each: true})
    @Type(() => UpdateCharBoxDTO)
    charBox: UpdateCharBoxDTO;
}

/**
 * 查询CharBox
 */
export class GetCharBoxByUserIdDTO{
    @IsString()
    public readonly userId: string; // User Id
}



/**
 * deleteByid 不开放？
 */
export class DeleteOneRequestDTO{
    @IsString()
    public readonly id: string;
    @IsString()
    public readonly userId: string;

}


/* 
  后端返回给前端时，CharBox的数据格式
  不需要是class，因为不需要做自动类型检查
*/
export interface CharBoxResponseDTO{
    id: string,
    // userId: string, // 创建的时候保存，不可更改，永远不返回
    characterKeys: Record<string, Character>,
    updatedDate: string,
}

export function formatCharBoxDTO(obj: CharBox): CharBoxResponseDTO{
    const dto = {
        id: obj.id,
        // userId: obj.userId,// 创建的时候保存，不可更改，永远不返回
        characterKeys: obj.characterKeys,
        updatedDate: obj.updatedDate,
    }
    return dto;
}