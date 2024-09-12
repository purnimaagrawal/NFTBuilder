import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createMetadataRequestBody } from 'src/dtos/createMetadataRequestBody';
import { AssetsService } from './assets.service';
import { ListAssetsQuery } from './listAssetsQuery';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetService: AssetsService) {}

  @Get()
  async listAssets(@Query() query: ListAssetsQuery) {
    return await this.assetService.listAssets(query);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('media')) // name of the html form field should be 'media'
  async uploadMedia(@UploadedFile() mediaFile: Express.Multer.File) {
    return await this.assetService.uploadMedia(mediaFile);
  }

  @Post('metadata')
  async createMetadata(@Body() body: createMetadataRequestBody) {
    return await this.assetService.createMetadata(body);
  }
}
