import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresController } from './stores.controller';
import { Store, StoreSchema } from './stores.schema';
import { StoresService } from './stores.service';

@Module({
  imports: [
    MongooseModule,
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule {}
