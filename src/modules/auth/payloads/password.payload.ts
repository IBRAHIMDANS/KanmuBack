import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PasswordPayload {

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  base64EncodedPassword: string;

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  base64EncodedConfirmPassword: string;

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  id: string;
}
