import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { createCollectionRequestBody } from "src/dtos/createCollectionRequestBody";
import { ListCollectionsQuery } from "./listCollectionsQuery";
import { CollectionsService } from "./collections.service";

@Controller("collections")
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Post()
  async createCollection(@Body() body: createCollectionRequestBody) {
    return await this.collectionsService.createCollection(body);
  }

  @Get()
  async listCollections(@Query() query: ListCollectionsQuery) {
    return await this.collectionsService.listCollections(query);
  }
}
