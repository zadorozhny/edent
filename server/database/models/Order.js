import { Model, define } from '@/lib/Sequelize';

@define()
export default class Order extends Model {
  static fields = DataTypes => ({
    role: DataTypes.STRING,
  })
}
