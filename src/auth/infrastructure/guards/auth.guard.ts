import { JwtPayload, JwtPort, JwtPortSymbol } from './../../domain/jwt.port';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(JwtPortSymbol)
    private readonly jwtPort: JwtPort
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload: JwtPayload = this.jwtPort.verifyToken(token);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}