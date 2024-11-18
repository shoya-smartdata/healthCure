const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('healthcure', 'root', 'smart@2099', {
  host: 'localhost',
  dialect: 'mysql'
});


const connectdb = async()=>{
    try {
        await sequelize.authenticate();
        console.log('db conn successfully.');
      } catch (error) {
        console.error('Unable to connect db:', error);
      }
}

connectdb();

module.exports = sequelize;