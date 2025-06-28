import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import bcrypt from 'bcrypt';

class UserService {
  async getUserById(id: string) {
    return await User.findByPk(id, {
      attributes: ['id', 'createdAt', 'updatedAt'],
      include: [{
        model: Token,
        attributes: ['id', 'expires', 'isActive']
      }]
    });
  }

  async updateUser(id: string, password: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    return user;
  }

  async deleteUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
  }

  async deactivateAllRefreshTokens(userId: string) {
    await Token.update(
      { isActive: false },
      { where: { userId } }
    );
  }
}

export default new UserService();