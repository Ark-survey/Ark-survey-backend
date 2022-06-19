import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CharSkinBoxResponseDTO,  formatCharSkinBoxDTO, CreateCharSkinBoxDTO, UpdateCharSkinBoxDTO } from './char-skin-box.dto';
import { CharSkinBox, } from './char-skin-box.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CharSkinBoxService {
    private readonly logger = new Logger(CharSkinBoxService.name);
    constructor(
        @InjectModel('CharSkinBox')
        private readonly charSkinBoxModel: Model<CharSkinBox>,
    ){}

    async getCharSkinBoxByUserId(userId: string): Promise<CharSkinBoxResponseDTO>{
        const charSkinBox = await this.charSkinBoxModel.findOne({userId}).lean() as CharSkinBox;
        return charSkinBox == null? null:formatCharSkinBoxDTO(charSkinBox);
    }

    async createOne(dto: CreateCharSkinBoxDTO): Promise<CharSkinBoxResponseDTO>{
        return formatCharSkinBoxDTO((await this.charSkinBoxModel.create({
            ...dto,
            id: uuidv4(),
            updatedDate: new Date().getTime(),
          })).toObject({ flattenMaps: true }));
    }

    async updateOne(dto: UpdateCharSkinBoxDTO): Promise<CharSkinBoxResponseDTO>{  
        
        const res = formatCharSkinBoxDTO(await this.charSkinBoxModel.findOneAndUpdate(
            { id: dto.id },
            {
            charSkinKeys: dto.charSkinKeys,
            updatedDate: new Date().getTime(),
          },
          {new: true}, //返回update后的document
          ).lean());    
        return res;
    }

    async deleteById(userId:string, id:string): Promise<CharSkinBoxResponseDTO>{        
        const res = await this.charSkinBoxModel.findOneAndDelete(
            { id }).lean();
            // this.logger.debug(res)
        return res;
    }



    /***
     * 
     */
    async isUserCharSkinBoxExists(userId: string): Promise<boolean>{
        // const userCharBox = await this.getCharBoxByUserId(userId);
        //https://mongoosejs.com/docs/api.html#model_Model.exists
        const isExist = await this.charSkinBoxModel.exists({userId});
        return isExist == null? false: true;

    }

    /**
     * 调用前需确保userId在db中有对应的charSkinBox
     * @param userId : userId
     * @param charSkinBoxId : charSkinBoxid
     * @returns userId对应的CharSkinBoxId是否和charSkinBoxId一致
     */
    async isUserCharSkinBoxIdMatch(userId: string, charSkinBoxId: string): Promise<boolean>{
        const userCharSkinBox = await this.getCharSkinBoxByUserId(userId);
        return userCharSkinBox.id == charSkinBoxId;

    }

    /**
     * 上面两个函数的结合；方便调用，且只访问一次数据库
     * @param userId 
     * @param charSkinBoxId 
     * @returns 
     */
    async isExistAndMatch(userId: string, charSkinBoxId: string): Promise<boolean>{
        const userCharSkinBox = await this.getCharSkinBoxByUserId(userId);
        if(userCharSkinBox == null) return false;
        if(userCharSkinBox.id != charSkinBoxId) return false;
        return true;
    }
}

