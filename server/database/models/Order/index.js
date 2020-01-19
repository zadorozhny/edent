import { Model, define } from '@/lib/Sequelize';

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
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER
    }
  })

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
