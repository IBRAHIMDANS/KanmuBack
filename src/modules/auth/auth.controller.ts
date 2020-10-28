import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
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
  async login(@Request() req) {
    return req.user;
  }
}
