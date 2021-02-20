import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class GamePayload {
  @IsString()
  @ApiModelProperty({ name: "name", required: true })
  name: string;

}
