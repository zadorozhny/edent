import { Model, define } from '@/lib/Sequelize';

@define()
export default class Manufacturer extends Model {
  static fields = DataTypes => ({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
