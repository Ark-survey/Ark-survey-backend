import { IsString } from "class-validator";
import { Character, CharBox } from "./char-box.interface";
import { charBox } from "./char-box.schema";

export class CharBoxRequestDTO{
    id?: string;
    userId: string; 
    characterKeys: Record<string, Character>;
}

export class GetCharBoxByUserIdDTO{
    @IsString()
    public readonly userId: string; // User Id
}

/**
 * 创建CharBox
 * 合法性判断：
 *      userId在charbox中不重复
 *      userId在User中存在
 *  
 */
export class CreateCharBoxDTO{
    charBox: CharBoxRequestDTO;
}

/**
 * deleteByid 不开放？
 */
//  export class CreateOneDTO{
//     charBox: CharBox;
// }
/**
 * 更新CharBox
 * 合法性判断：
 *      DTO中id对应的charbox中的userId匹配
 *      （无需判断，createOne已保证）userId在User中存在
 *      
 *  
 */
export class updateOneDTO{
    charBox: CharBox;
}

/* 
  后端返回给前端时，CharBox的数据格式
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
        // userId: obj.userId,
        characterKeys: obj.characterKeys,
        updatedDate: obj.updatedDate,
    }
    return dto;
}