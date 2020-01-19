import { Model, define } from '@/lib/Sequelize';

@define()
export default class OrderToProducts extends Model {
  static fields = DataTypes => ({
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    });
  }
}
