import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

type InputProps = {
  email: string;
  password: string;
};

@Controller('login')
@UseGuards(AuthGuard('local'))
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post()
  async login(@Res() res, @Body() input: InputProps): Promise<any> {
    const { email, password } = input;
    const user = await this.authService.login({ email, password });

    res.status(200).json(user).send();
  }
}
