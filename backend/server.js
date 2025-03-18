require("dotenv").config();

const express =require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const postRoutes=require('./routes/posts')
const categoryRoutes=require('./routes/categories')

const cors=require('cors')


const app=express()
const PORT=process.env.PORT || 3000

//Middleware
app.use(bodyParser.json())
app.use(cors())


// mongoose.connect('mongodb://localhost:27017/blog')
mongoose.connect(process.env.MONGO_URI)

.then(()=>console.log('MongoDb Connected'))
.catch(err=>console.log('Db Error',err))

//use routes

app.use('/api/posts',postRoutes)
app.use('/api/categories',categoryRoutes)



app.listen(PORT,()=> console.log(`Server running on Port ${PORT}`))
