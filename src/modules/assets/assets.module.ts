import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Collection,
  CollectionSchema,
} from '../collections/collections.schema';
import { AssetsController } from './assets.controller';
import { Asset, AssetSchema } from './assets.schema';
import { AssetsService } from './assets.service';

@Module({
  imports: [
    MongooseModule,
    MongooseModule.forFeature([
      { name: Asset.name, schema: AssetSchema },
      { name: Collection.name, schema: CollectionSchema },
    ]),
  ],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
