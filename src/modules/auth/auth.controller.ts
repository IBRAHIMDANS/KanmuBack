import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";


import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { TokenModel } from "./dto/token.model";
import { EmailPayload, LoginPayload } from "./payloads";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RegisterPasswordPayload } from "./payloads/registerPassword.payload";

@Controller("auth")
@ApiTags("authentication")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
    // private readonly passwordService: PasswordService,
  ) {
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 201, description: "Successful Login" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Request() req, @Body() body: LoginPayload): Promise<TokenModel> {
    return await this.authService.createToken(req.user);
  }


  @Post("register")
  @ApiResponse({ status: 201, description: "Successful Registration" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async register(@Body() payload) {
    return await this.userService.create(payload);
  }

  @Post("send-mail-forget")
  // @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 201, description: "Successful Registration" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async forgetPasswordIsNotConnect(@Body() payload: EmailPayload) {
    return await this.userService.SendMailForgetPassword(payload);
  }

  @Post('reset-password')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async resetPassword(@Body() payload: RegisterPasswordPayload) {
    return await this.userService.resetPasswordRegister(payload);
  }

}
