import Sequelize, { Op } from 'sequelize';
import { Model, define } from '@/lib/Sequelize';
import Passwords from '@/lib/Passwords';
import filters from '@/database/models/Order/filters';

@define()
export default class User extends Model {
  static fields = DataTypes => ({
    role: {
      type: DataTypes.ENUM(['user', 'admin']),
      allowNull: false,
      defaultValue: 'user'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      get: () => undefined
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
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

  static scopes() {
    this.addScope('filter', (options, { context, defaults } = {}) => ({
      where: Object.keys(options).reduce((where, key) => {
        if (filters[key]) {
          filters[key](where, options, context);
        }
        return where;
      }, { [Op.and]: [], ...defaults })
    }));
    this.addScope('order', ({ order }) => ({
      order: order.split(';').map(expression => {
        const [column, direction] = expression.split(',');
        return [Sequelize.col(column), direction];
      })
    }));
    this.addScope('pagination', ({ offset, limit }) => ({
      offset,
      limit
    }));
  }

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
