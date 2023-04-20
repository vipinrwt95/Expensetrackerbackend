const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const ForgotPassword=sequelize.define('PasswordRequest',{
  id:{type:Sequelize.CHAR,primaryKey:true},
  userId:{type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    },
  isActive:{type:Sequelize.BOOLEAN}
});

module.exports=ForgotPassword;