import glob from 'glob';
import Sequelize from 'sequelize';
import config from '@/config/database';

export { sql } from '@/lib/Sequelize';
export const { Op } = Sequelize;
export const sequelize = new Sequelize(config);
export const { models } = sequelize;

glob
  .sync('./models/*', { cwd: __dirname })
  .forEach(path => sequelize.import(path));

Object.values(models).forEach(model => {
  if ('scopes' in model) {
    model.scopes(models);
  }
});

Object.values(models).forEach(model => {
  if ('associate' in model) {
    model.associate(models);
  }
});
