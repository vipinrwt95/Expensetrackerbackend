const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense-tracker','root','Lkpo098!@#',{dialect:'mysql',host:'localhost'});

module.exports=sequelize;