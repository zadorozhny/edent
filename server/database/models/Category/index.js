import Sequelize, { Op } from 'sequelize';
import { Model, define } from '@/lib/Sequelize';
import filters from '@/database/models/Category/filters';

@define({ hierarchy: { throughKey: 'categoryId', throughTable: 'CategoryToAncestors' } })
export default class Category extends Model {
  static fields = DataTypes => ({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER
    },
    hierarchyLevel: {
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
}
