import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class StructurePayload {
  @IsString()
  @ApiModelProperty({ name: 'name', required: true })
  name: string;

  @IsString()
  @ApiModelProperty({
    name: 'created_at_structure',
    required: true,
    type: 'timestamp',
  })
  createdAtStructure: Date;

  @IsString()
  @ApiModelProperty({ name: 'number_member', required: true })
  numberMember: string;

  @IsString()

  @ApiModelProperty({ required: true })
  description: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ type: 'simple-array', name: 'game_list' })
  gameList?: string[];


  @ApiModelProperty({ name: 'logo_url' })
  logoUrl: string;

  @ApiModelProperty({ name: 'banner_url' })
  bannerUrl: string;


  @ApiModelProperty({ name: 'address' })
  address: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ type: 'simple-array', name: 'social_networks' })
  socialNetworks?: string[];

}
