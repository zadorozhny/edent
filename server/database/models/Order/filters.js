import { Op } from 'sequelize';
import { sql } from '@/lib/Sequelize';

export default {
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
