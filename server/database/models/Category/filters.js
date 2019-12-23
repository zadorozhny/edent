import { Op } from 'sequelize';

export default {
  categories(where, { categories }) {
    where[Op.and].push({
      [Op.or]: categories.map(id => ({ id }))
    });
  }
};
