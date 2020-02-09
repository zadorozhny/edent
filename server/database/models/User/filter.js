import { Op } from 'sequelize';

export default {
  search(where, { search }) {
    where[Op.and].push({
      [Op.or]: [
        {
          email: { [Op.iLike]: `%${search}%` }
        },
        {
          name: { [Op.iLike]: `%${search}%` }
        },
        {
          phone: { [Op.iLike]: `%${search}%` }
        }
      ]
    });
  }
};
