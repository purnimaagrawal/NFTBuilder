export interface createMetadataRequestBody {
  name: string;
  description: string;
  image: string;
  external_url: string;
  categories: string[];
  attributes: object[];
}
