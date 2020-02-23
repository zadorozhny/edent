import Sequelize from 'sequelize';
import { models } from '@/database';
import { service } from '@/lib/decorators';

@service
export default class Utility {
  async getOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['manufacturer']
    });
    return product;
  }

  async getList(filters) {
    const [{ count, rows }, { min, max }] = await Promise.all([
      models.Product
        .scope(
          { method: ['filter', filters] },
          { method: ['pagination', filters] }
        )
        .findAndCountAll({
          include: [
            {
              model: models.Manufacturer,
              as: 'manufacturer'
            },
            {
              model: models.Category,
              as: 'categories'
            }
          ]
        }),
      models.Product
        .scope(
          { method: ['filter', filters] },
          { method: ['pagination', filters] }
        )
        .findOne({
          attributes: [
            [Sequelize.fn('max', Sequelize.col('price')), 'max'],
            [Sequelize.fn('min', Sequelize.col('price')), 'min']
          ],
          raw: true
        })
    ]);
    return { count, rows, min, max };
  }
}
