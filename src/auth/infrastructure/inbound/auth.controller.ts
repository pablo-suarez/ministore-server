import { LoginUseCase } from './../../application/login.usecase';
import { CreateUserUseCase } from './../../application/create-user.usecase';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase
  ) { }

  @Post('register')
  async createUser(@Body() createUser: any) {
    return this.createUserUseCase.execute(createUser);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.loginUseCase.execute(body.email, body.password);
  }
  
  @Get('test')
  @UseGuards(JwtAuthGuard)
  getSecureData(@Req() req): string {
    return `Hello, ${req.user.email}. This is secure data!`;
  }
}
