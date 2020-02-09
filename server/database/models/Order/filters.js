import { Op } from 'sequelize';
import { sql } from '@/lib/Sequelize';

export default {
  search(where, { search }) {
    where[Op.and].push({
      [Op.or]: [
        {
          phone: { [Op.iLike]: `%${search}%` }
        },
        {
          email: { [Op.iLike]: `%${search}%` }
        }
      ]
    });
  },
  status(where, { status }) {
    where[Op.and].push({
      status
    });
  },
  shipping(where, { shipping }) {
    where[Op.and].push({
      shipping
    });
  },
  userId(where, { userId }) {
    where[Op.and].push({
      userId
    });
  },
  productId(where, { productId }) {
    where[Op.and].push(sql`(
      SELECT TRUE
      FROM "OrderToProducts"
      WHERE "productId" = ${productId}
    )`);
  },
};
