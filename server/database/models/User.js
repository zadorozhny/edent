import { Model, define } from '@/lib/Sequelize';
import Passwords from '@/lib/Passwords';

@define()
export default class User extends Model {
  static fields = DataTypes => ({
    role: DataTypes.ENUM(['user', 'admin']),
    email: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    phone: DataTypes.STRING(32),
    hash: {
      type: DataTypes.STRING,
      get: () => undefined
    },
    salt: {
      type: DataTypes.STRING,
      get: () => undefined
    },
    password: {
      type: DataTypes.VIRTUAL(DataTypes.STRING),
      set(password) {
        const { hash, salt } = Passwords.hash(password);
        this.setDataValue('salt', salt);
        this.setDataValue('hash', hash);
      }
    }
  })

  static associate(models) {
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'userId'
    });
  }

  tokens(tokens) {
    this.setDataValue('tokens', tokens);
    return this;
  }

  isCurrentPassword(password) {
    return Passwords.compare(password, this.getDataValue('hash'), this.getDataValue('salt'));
  }
}
