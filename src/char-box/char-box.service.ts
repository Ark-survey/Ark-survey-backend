import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CharBoxResponseDTO, CharBoxRequestDTO, formatCharBoxDTO } from './char-box.dto';
import { CharBox, } from './char-box.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CharBoxService {
    private readonly logger = new Logger(CharBoxService.name);
    constructor(
        @InjectModel('CharBox')
        private readonly charBoxModel: Model<CharBox>,
    ){}

    async getCharBoxByUserId(userId: string): Promise<CharBoxResponseDTO>{
        const charBox = formatCharBoxDTO(await this.charBoxModel.find({userId}).lean())
        return charBox;
    }

    async createOne(dto: CharBoxRequestDTO): Promise<CharBoxResponseDTO>{
        return formatCharBoxDTO(await this.charBoxModel.create({
            ...dto,
            id: uuidv4(),
            updatedDate: new Date().getTime(),
          }));
    }
}

