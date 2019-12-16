import Sequelize from 'sequelize';
import sqlstring from 'sqlstring';

export const { Model } = Sequelize;

export const define = options => Model => (sequelize, DataTypes) => {
  Model.init(Model.fields(DataTypes), {
    ...options,
    modelName: Model.name,
    sequelize
  });
  return Model;
};

export const sql = (parts, ...data) => (
  Sequelize.literal(sqlstring.format(parts.join('?'), data).replace(/[\t\s\n]+/g, ' '))
);
