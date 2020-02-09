import Sequelize, { Op } from 'sequelize';
import { Model, define } from '@/lib/Sequelize';
import filters from '@/database/models/Product/filters';

@define()
export default class Manufacturer extends Model {
  static fields = DataTypes => ({
    name: {
      type: DataTypes.STRING,
      allowNull: false
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
    this.hasMany(models.Product, {
      foreignKey: 'manufacturerId'
    });
  }
}
