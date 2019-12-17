import { Model, define } from '@/lib/Sequelize';

@define()
export default class Category extends Model {
  static fields = DataTypes => ({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
