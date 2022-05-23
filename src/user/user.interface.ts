import { Document } from 'mongoose';





/**
 * User
 *  * User的一个例子，Document持有两个属性，_id, __v
 * {
      "id": "11223344",
      "password": "123",
      "createdIp": "::1",
      "createdDate": "1653139165715",
      "updatedIp": "::1",
      "updatedDate": "1653139165715",
      "_id": "6288e6dd7644ad03d662bb5e",
      "__v": 0
    },
 */
export interface User extends Document{ 
  readonly id: string; // User 唯一 ID
  readonly password: string; // 操作密码
  readonly createdIp: string;
  readonly createdDate: string;
  readonly updatedIp: string;
  readonly updatedDate: number; 
}


// export interface UserResponse{
//     readonly id: string; // User 唯一 ID
//     readonly password: string; // 操作密码
//     readonly createdIp: string;
//     readonly createdDate: string;
//     readonly updatedIp: string;
//     readonly updatedDate: number; 
// }