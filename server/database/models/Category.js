import { Model, define } from '@/lib/Sequelize';

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
}
