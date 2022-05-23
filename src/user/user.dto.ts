import { IsString } from 'class-validator';
import { User } from './user.interface';

// user.dto.ts
/* CreateUser 前端请求的数据格式 */
export class CreateUserRequestDTO {
  public readonly password?: string;
}

/* UpdateUser 前端请求的数据格式 */
export class UpdateUserRequestDTO {
  @IsString()
  public readonly id: string;
  public readonly password?: string;
}

/* getById 前端请求的数据格式 */
export class GetByIdRequestDTO{
  @IsString()
  public readonly id: string;
}

/* 
  后端返回给前端的统一的数据格式
*/
export class UserDTO{
  readonly id: string; // User 唯一 ID
  readonly password?: string; // 操作密码
  readonly createdIp: string;
  readonly createdDate: string;
  readonly updatedIp: string;
  readonly updatedDate: number; 
}

/*
  格式化生成UserDTO
*/
//有没有更方便的方法从已知类型提取属性到另一个类型？
export function formatUserDTO(obj: User) {
  const response: UserDTO = {
    id: obj.id,
    password: obj?.password,
    createdIp: obj.createdIp,
    createdDate: obj.createdDate,
    updatedDate: obj.updatedDate,
    updatedIp: obj.updatedIp,

  };
  return response;
}
