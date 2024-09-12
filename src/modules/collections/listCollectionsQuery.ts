import { IsOptional, IsString } from "class-validator";
export class ListCollectionsQuery {
  @IsOptional()
  @IsString()
  collectionId: Number;
}
