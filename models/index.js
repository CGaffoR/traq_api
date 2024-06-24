//initialize index for sequelize
const sequelize = require('../config/database');

const User = require('./user');
const Profile = require('./profile');
Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
const syncDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado');
};

syncDatabase();

module.exports = { User, Profile };