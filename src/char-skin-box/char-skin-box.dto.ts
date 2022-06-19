import { Type } from "class-transformer";
import { IsInt, IsNumber, isNumber, IsString, Max, Min, ValidateNested } from "class-validator";
import { CharSkinBox } from "./char-skin-box.interface";


/**
 * 创建CharSkinBox
 * 合法性判断：
 *      userId在charSkinbox中不重复
 *      userId在User中存在
 *  
 */
export class CreateCharSkinBoxDTO{
    // id?: string; //createOne不需包含，updateOne需要包含
    @IsString()
    userId: string; 
    charSkinKeys: string[];
}

export class CreateOneRequestDTO{
    @ValidateNested({each: true})
    @Type(() => CreateCharSkinBoxDTO)
    charSkinBox: CreateCharSkinBoxDTO;
}

/**
 * 更新CharSkinBox
 * 合法性判断：
 *      DTO中id对应的charskinbox中的userId匹配
 *      （无需判断，createOne已保证）userId在User中存在
 *      
 *  
 */
export class UpdateCharSkinBoxDTO{
    @IsString()
    id: string; //createOne不需包含，updateOne需要包含
    @IsString()
    userId: string; 
    charSkinKeys: string[];
}
 export class UpdateOneRequestDTO{
    @ValidateNested({each: true})
    @Type(() => UpdateCharSkinBoxDTO)
    charSkinBox: UpdateCharSkinBoxDTO;
}

/**
 * 查询CharSkinBox
 */
export class GetCharSkinBoxByUserIdDTO{
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
  后端返回给前端时，CharSkinBox的数据格式
  不需要是class，因为不需要做自动类型检查
*/
export interface CharSkinBoxResponseDTO{
    id: string,
    // userId: string, // 创建的时候保存，不可更改，永远不返回
    charSkinKeys: string[];
    updatedDate: string,
}

export function formatCharSkinBoxDTO(obj: CharSkinBox): CharSkinBoxResponseDTO{
    const dto = {
        id: obj.id,
        // userId: obj.userId,// 创建的时候保存，不可更改，永远不返回
        charSkinKeys: obj.charSkinKeys,
        updatedDate: obj.updatedDate,
    }
    return dto;
}