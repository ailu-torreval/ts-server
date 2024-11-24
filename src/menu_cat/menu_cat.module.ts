import { Module } from '@nestjs/common';
import { MenuCatService } from './menu_cat.service';
import { MenuCatController } from './menu_cat.controller';

@Module({
  controllers: [MenuCatController],
  providers: [MenuCatService],
})
export class MenuCatModule {}
