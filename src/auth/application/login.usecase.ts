import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtPort, JwtPortSymbol } from '../domain/jwt.port';
import { UsersRepository, UsersRepositorySymbol } from '../domain/users.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(UsersRepositorySymbol)
    private readonly userRepository: UsersRepository,
    @Inject(JwtPortSymbol)
    private readonly jwtPort: JwtPort,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Comparing input password with the stored one
    const isPasswordValid = bcrypt.compareSync(password, user.getProps().password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const token = await this.jwtPort.generateToken({ userId: user.id, email: user.getProps().email });
    return { token };
  }
}
