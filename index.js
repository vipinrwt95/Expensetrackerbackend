const express = require("express");
const cors = require('cors');
const sequelize=require('./util/database');
const bodyParser=require('body-parser');
const path=require('path');
const PORT = process.env.PORT || 3001;

const registerRoutes=require('./routes/register');
const ExpenseRoutes=require('./routes/expense')

const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use(registerRoutes)
app.use(ExpenseRoutes)
sequelize.sync().then(result=>{
    
app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
      })
})
