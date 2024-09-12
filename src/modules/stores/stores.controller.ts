import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { createStoreRequestBody } from 'src/dtos/createStoreRequestBody';
import { updateStoreNameRequestBody } from 'src/dtos/updateStoreNameRequestBody';
import { ListStoresQuery } from './listStoresQuery';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Post()
  async createStore(@Body() body: createStoreRequestBody) {
    return await this.storesService.createStore(body);
  }

  @Get()
  async listStores(@Query() query: ListStoresQuery) {
    return await this.storesService.listStores(query);
  }

  @Patch('/name')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateStoreName(@Body() body: updateStoreNameRequestBody) {
    await this.storesService.updateStoreName(body);
  }
}
