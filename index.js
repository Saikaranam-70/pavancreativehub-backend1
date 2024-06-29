const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require('cors');
const bodyparser = require('body-parser')
const adminRotes = require('./routes/adminRoutes')
const programRoutes = require('./routes/programRoutes')
const resetPasswordRoutes = require('./routes/resetPasswordRoutes')


const app = express();
const PORT = process.env.PORT||4500;
dotEnv.config();
app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Mongo DB connected successfully")
}).catch((error)=>console.log(error))

app.use(bodyparser.json());
app.use('/admin', adminRotes);
app.use('/program', programRoutes)
app.use('/update', resetPasswordRoutes);

app.listen(PORT , ()=>{
    console.log(`Server started and rnning at ${PORT}`)
})

app.use('/', (req, res)=>{
    res.send("<h1>Hello sai </h1>")
})