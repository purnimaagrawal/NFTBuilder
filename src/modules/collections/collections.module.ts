import { Module } from "@nestjs/common";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { StoresModule } from "../stores/stores.module";
import { CollectionsController } from "./collections.controller";
import { Collection, CollectionSchema } from "./collections.schema";
import { Store, StoreSchema } from "../stores/stores.schema";
import { CollectionsService } from "./collections.service";

@Module({
  imports: [
    MongooseModule,
    StoresModule,
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
      { name: Store.name, schema: StoreSchema },
    ]),
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
