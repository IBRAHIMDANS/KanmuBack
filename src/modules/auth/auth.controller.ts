import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TokenModel } from './dto/token.model';
import { EmailPayload, PasswordPayload, RegisterPayload } from './payloads';
import { User } from '../../entities';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    // private readonly passwordService: PasswordService,
  ) {
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req): Promise<TokenModel> {
    return await this.authService.createToken(req.user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<Partial<User>> {
    console.log(payload);
    return await this.userService.create(payload);
  }

  @Post('send-mail-forget')
  // @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async forgetPasswordIsNotConnect(@Body() payload: EmailPayload): Promise<User> {
    return await this.userService.SendMailForgetPassword(payload);
  }

  @Post('reset-password')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async resetPassword(@Body() payload: PasswordPayload) {
    return await this.userService.resetPassword(payload);
  }

}
