import { IsString } from "class-validator";
import { Character, CharBox } from "./char-box.interface";
import { charBox } from "./char-box.schema";

/**
 * 创建CharBox
 * 合法性判断：
 *      userId在charbox中不重复
 *      userId在User中存在
 *  
 */
export class CreateCharBoxDTO{
    // id?: string; //createOne不需包含，updateOne需要包含
    userId: string; 
    characterKeys: Record<string, Character>;
}
 export class CreateOneRequestDTO{
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
    id: string; //createOne不需包含，updateOne需要包含
    userId: string; 
    characterKeys: Record<string, Character>;
}
 export class UpdateOneRequestDTO{
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
  不需要是interface，因为不需要做自动类型检查
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