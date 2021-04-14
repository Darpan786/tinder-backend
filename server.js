import express from "express";
import mongoose from "mongoose";
import Cards from './dbCards.js';
import Cors from 'cors';

// App Config

const app = express();
const port = process.PORT || 8001
const connection_url = 'mongodb+srv://admin-darpan:Darpan786@cluster0.ikxcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// Middlewares

app.use(express.json());
app.use(Cors())



//DB Config
mongoose.connect(connection_url , {
     useNewUrlParser:true,
     useCreateIndex:true,
     useUnifiedTopology:true,
})

//API Endpoints
app.get('/' , (req,res) => {
     res.status(200).send("Hello Darpan")
})

app.post('/tinder/cards',(req,res) => {
     const dbCard = req.body;

     Cards.create(dbCard , (err , data) => {
          if(err){
               res.status(500).send(err)
          }else{
               res.status(201).send(data)
          }
     })

})

app.get('/tinder/cards' , (req,res) => {
     Cards.find((err , data) => {
          if(err){
               res.status(500).send(err)
          }else{
               res.status(200).send(data)
          }
     })

})

//Listener
app.listen(port , () => {
     console.log(`listening on localhost: ${port}`)
})
