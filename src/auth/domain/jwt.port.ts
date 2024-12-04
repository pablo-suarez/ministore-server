export const JwtPortSymbol = Symbol('JwtPort');

export interface JwtPayload {
    userId: string;
    email: string;
  }

export interface JwtPort {
  generateToken(payload: JwtPayload): string;
  verifyToken(token: string): JwtPayload;
}
