import { Op } from 'sequelize';
// import { sql } from '@/lib/Sequelize';

export default {
  search(where, { search }) {
    where[Op.and].push({
      name: { [Op.iLike]: `%${search}%` }
    });
  },
  manufacturerId(where, { manufacturerId }) {
    where[Op.and].push({
      manufacturerId
    });
  },
  price(where, { price }) {
    const [from, to] = JSON.parse(price);
    where[Op.and].push({
      price: { [Op.between]: [from, to] }
    });
  }
};
