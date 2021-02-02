const express = require('express');
const mongoose = require('mongoose');
const config = require("./config/key");

const PORT = 5000;


//app
const app = express();
const productRoutes = require("./routes");

 // express 에 있는 middle ware 로 bodyParser 대체
app.use(express.json());

mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//router part    
app.use('/api/products', productRoutes);

// app.listen(PORT);

app.get('/', (req,res) => {
  res.send("hello world");
})

app.use((error, req,res, next) => {
  res.status(500).json({ message: error.message })
})

module.exports = app;