import Sequelize, { Op } from 'sequelize';
import { Model, define } from '@/lib/Sequelize';
import filters from '@/database/models/Order/filters';

@define()
export default class Order extends Model {
  static fields = DataTypes => ({
    status: {
      type: DataTypes.ENUM(['pending', 'finished', 'closed']),
      defaultValue: 'pending',
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    shipping: {
      type: DataTypes.ENUM(['post', 'courier']),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER
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
    this.belongsToMany(models.Product, {
      through: 'OrderToProducts',
      updatedAt: false,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
    this.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    this.hasMany(models.OrderToProducts, {
      foreignKey: 'orderId',
      as: 'products'
    });
  }
}
