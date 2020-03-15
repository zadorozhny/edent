import Sequelize from 'sequelize';
import { models } from '@/database';
import { service, schema } from '@/lib/decorators';
import { product as schemas } from '@/services/products/schemas';

@service
export default class Utility {
  @schema(schemas.identifier)
  async getOne(id) {
    const product = await models.Product.findByPk(id, {
      include: [
        'manufacturer',
        'categories'
      ],
      order: [
        [{ model: models.Category, as: 'categories' }, 'hierarchyLevel', 'ASC']
      ]
    });
    return product;
  }

  @schema(schemas.filters)
  async getList(filters) {
    const [{ count, rows }, { min, max }] = await Promise.all([
      models.Product
        .scope(
          { method: ['filter', filters] },
          { method: ['order', filters] },
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
          ],
          distinct: true
        }),
      models.Product
        .scope(
          { method: ['filter', filters] }
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
