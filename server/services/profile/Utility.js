import { models, sequelize } from '@/database';
import { utility as schemas } from '@/services/profile/schemas';
import { ERRORS } from '@/config';
import { service, schema } from '@/lib/services/decorators';
import { noreply } from '@/lib/Mailer';
import { AccessToken, RefreshToken, ConfirmationToken, ResetToken } from '@/lib/Tokens';

@service({ schemas })
export default class Utility {
  static createTokens(user) {
    return {
      access: AccessToken.create({
        id: user.id,
        email: user.email,
        role: user.role,
        isVerified: Boolean(user.isVerified),
        isCompleted: Boolean(user.isCompleted)
      }),
      refresh: RefreshToken.create(user.id)
    };
  }
  async signup(data) {
    const transaction = await sequelize.transaction();
    try {
      const user = await models.User.create(data);
      return user.tokens(this.constructor.createTokens(user));
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
  async signin({ email, password }) {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw HttpError(404, ERRORS.USER_NOT_FOUND);
    }
    if (!user.isCurrentPassword(password)) {
      throw HttpError(400, ERRORS.WRONG_PASSWORD);
    }
    return user.tokens(this.constructor.createTokens(user));
  }
  async signout() {
    return RefreshToken.destroy(this.user.id);
  }
  @schema('refresh')
  async refresh({ refreshToken }) {
    if (await RefreshToken.verify(this.user.id, refreshToken)) {
      return this.constructor.createTokens(this.user);
    } else {
      throw HttpError(401, ERRORS.WRONG_REFRESH_TOKEN);
    }
  }
  @schema('forgotPassword')
  async forgotPassword({ email }) {
    const user = await models.User.findOne({
      where: { email }
    });
    if (!user) {
      throw HttpError(404, ERRORS.USER_NOT_FOUND);
    }
    noreply.send({
      to: user.email,
      type: 'reset-password',
      data: {
        token: ResetToken.create({ userId: user.id })
      }
    });
  }
  @schema('resetPassword')
  async resetPassword({ resetToken, password }) {
    try {
      const { userId } = ResetToken.verify(resetToken);
      await models.User.update({ password }, {
        where: { id: userId }
      });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw HttpError(400, ERRORS.RESET_TOKEN_EXPIRED);
      }
      throw HttpError(400, ERRORS.WRONG_RESET_TOKEN);
    }
  }
}
