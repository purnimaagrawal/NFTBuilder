import { IsOptional, IsString } from 'class-validator';
export class ListStoresQuery {
  @IsOptional()
  @IsString()
  storeId: Number;

  @IsOptional()
  @IsString()
  email: String;
}
