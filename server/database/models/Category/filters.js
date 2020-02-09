import { Op } from 'sequelize';

export default {
  search(where, { search }) {
    where[Op.and].push({
      name: { [Op.iLike]: `%${search}%` }
    });
  }
};
