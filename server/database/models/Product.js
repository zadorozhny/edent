import { Model, define } from '@/lib/Sequelize';

@define()
export default class Product extends Model {
  static fields = DataTypes => ({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }
  })

  static associate(models) {
    this.belongsToMany(models.Category, {
      through: 'ProductToCategories',
      as: 'categories',
      updatedAt: false,
      foreignKey: 'productId',
      otherKey: 'categoryId'
    });
    this.belongsTo(models.Manufacturer, {
      foreignKey: 'manufacturerId'
    });
  }
}
