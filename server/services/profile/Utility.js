import { models } from '@/database';
import ServiceError from '@/lib/Errors';
import * as ERRORS from '@/config/errors';
import { service, schema } from '@/lib/decorators';
import { utility as schemas } from '@/services/profile/schemas';
import { AccessToken, RefreshToken } from '@/lib/Tokens';

@service
export default class Utility {
  static createTokens(user) {
    return {
      access: AccessToken.create({
        id: user.id,
        email: user.email,
        role: user.role
      }),
      refresh: RefreshToken.create(user.id)
    };
  }

  async get() {
    const user = await models.User.findByPk(this.user.id);
    return user;
  }

  @schema(schemas.signin)
  async signin({ email, password }) {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw new ServiceError('not found', ERRORS.USER_NOT_FOUND);
    }
    if (!user.isCurrentPassword(password)) {
      throw new ServiceError('wrong', ERRORS.WRONG_PASSWORD);
    }
    return user.tokens(this.constructor.createTokens(user));
  }

  async signout() {
    return RefreshToken.destroy(this.user.id);
  }

  @schema(schemas.refresh)
  async refresh({ refreshToken }) {
    if (await RefreshToken.verify(this.user.id, refreshToken)) {
      return this.constructor.createTokens(this.user);
    } else {
      throw new ServiceError('unauthorised', ERRORS.WRONG_REFRESH_TOKEN);
    }
  }
}
