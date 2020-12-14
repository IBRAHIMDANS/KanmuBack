import { IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class StructurePayload {
  @ApiModelProperty({ required: true })
  @IsEmail()
  email: string;

  @IsString()
  @ApiModelProperty({ required: true })
  title: string;

  @IsString()
  @ApiModelProperty({ required: true })
  adminId: string;

  @IsString()
  @ApiModelProperty({ required: true })
  description: string;

  @IsString()
  @ApiModelProperty({ required: true })
  slug: string;

}
