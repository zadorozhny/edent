import { Op } from 'sequelize';
import { Model, define } from '@/lib/Sequelize';
import filters from '@/database/models/Product/filters';

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
      type: DataTypes.STRING,
      defaultValue: 'https://bit.ly/2QDBhSA'
    },
    isHidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
        return [column, direction];
      })
    }));
    this.addScope('pagination', ({ offset, limit }) => ({
      offset,
      limit
    }));
  }

  static associate(models) {
    this.belongsToMany(models.Category, {
      through: 'ProductToCategories',
      as: 'categories',
      updatedAt: false,
      foreignKey: 'productId',
      otherKey: 'categoryId'
    });
    this.belongsTo(models.Manufacturer, {
      foreignKey: 'manufacturerId',
      as: 'manufacturer'
    });
  }
}
