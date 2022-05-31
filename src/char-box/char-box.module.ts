import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharBoxController } from './char-box.controller';
import { charBox } from './char-box.schema';
import { CharBoxService } from './char-box.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CharBox', schema: charBox }, //name与@injectModel使用的一致
    ]),
  ],
  controllers: [CharBoxController],
  providers: [CharBoxService]
})
export class CharBoxModule {}
