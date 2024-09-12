import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PROTECTED_API_PATHS } from './constants';
import { AuthMiddleware } from './middleware/auth.middleware';
import { StoresModule } from './modules/stores/stores.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { AssetsModule } from './modules/assets/assets.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      autoIndex: true,
    }),
    StoresModule,
    CollectionsModule,
    AssetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...PROTECTED_API_PATHS);
  }
}
