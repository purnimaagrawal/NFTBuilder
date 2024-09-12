import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { getValidId } from 'src/utils/misc';
import { ERR_INVALID_ASSET_ID, ERR_INVALID_COLLECTION_ID } from 'src/errors';

export class ListAssetsQuery {
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => getValidId(value, ERR_INVALID_ASSET_ID))
  assetId?: number;

  @IsOptional()
  @IsString()
  tokenStandard?: string;

  @IsOptional()
  @IsString()
  owner?: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  @Transform(({ value }) =>
    value
      .split(',')
      .map((collectionId) =>
        getValidId(collectionId, ERR_INVALID_COLLECTION_ID),
      ),
  )
  collectionIds?: number[];
}
