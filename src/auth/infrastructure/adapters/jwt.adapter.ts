import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtPort } from '../../domain/jwt.port';

@Injectable()
export class JwtAdapter implements JwtPort {
    constructor(private readonly jwtService: JwtService) { }
    generateToken(payload: JwtPayload): string {
        return this.jwtService.sign(payload);
    }

    verifyToken(token: string): JwtPayload {
        return this.jwtService.verify(token);
    }
}
