import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';

class AuthService {
  async signUp(id: string, password: string) {
    const user = await User.create({ id, password });
    return this.generateTokens(user);
  }

  async signIn(id: string, password: string) {
    const user = await User.findOne({ where: { id } });
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    const tokenData = jwt.verify(refreshToken, jwtConfig.secret) as { userId: string };
    const token = await Token.findOne({
      where: { token: refreshToken, isActive: true },
    });

    if (!token || new Date(token.expires) < new Date()) {
      throw new Error('Invalid or expired refresh token');
    }

    const user = await User.findByPk(tokenData.userId);
    if (!user) {
      throw new Error('User not found');
    }

    return this.generateTokens(user);
  }

  async logout(refreshToken: string) {
    const token = await Token.findOne({ where: { token: refreshToken } });
    if (token) {
      token.isActive = false;
      await token.save();
    }
  }

  private async generateTokens(user: User) {
    const accessToken = jwt.sign({ userId: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.accessExpiration as SignOptions['expiresIn'],
    });

    const refreshToken = jwt.sign({ userId: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.refreshExpiration as SignOptions['expiresIn'],
    });

    await Token.create({
      token: refreshToken,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      isActive: true,
      userId: user.id,
    });

    return { accessToken, refreshToken };
  }
}

export default new AuthService();