const express = require("express");
const cors = require('cors');
const sequelize=require('./util/database');
const bodyParser=require('body-parser');
const path=require('path');
const PORT = process.env.PORT || 3001;
const passwordRoutes=require('./routes/password');
const registerRoutes=require('./routes/register');
const ExpenseRoutes=require('./routes/expense');
const purchaseRoutes=require('./routes/purchase');
const User = require("./models/user");
const Expense = require("./models/Expense");
const Order=require('./models/Order');
const dotenv=require("dotenv");
dotenv.congig();

const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use(registerRoutes)
app.use(ExpenseRoutes)
app.use(purchaseRoutes)
app.use(passwordRoutes);

User.hasMany(Expense)
Expense.belongsTo(User)
User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then(result=>{
    
app.listen(PORT, () => {
        
      })
})
