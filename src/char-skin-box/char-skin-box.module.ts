import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { CharSkinBoxController } from './char-skin-box.controller';
import { charSkinBox } from './char-skin-box.schema';
import { CharSkinBoxService } from './char-skin-box.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'CharSkinBox', schema: charSkinBox }]), UserModule],
  controllers: [CharSkinBoxController],
  providers: [CharSkinBoxService],
})
export class CharSkinBoxModule {}
