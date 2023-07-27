const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
const Product = require('./Product.js')
class Tag extends Model {}

Tag.init(
  {
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

// Tag.belongsToMany(Product, {through: 'ProductTag'})
module.exports = Tag;