import express from 'express'
import dotenv from 'dotenv'
import connectionDb from './src/config/database.js';
import router from './src/routes/user.route.js';

dotenv.config()
const app=express();
app.use(express.json())
const PORT=process.env.PORT || 5000;
connectionDb()

app.get("/", (req,res)=>{
res.send("server is running healthy")
})

app.use("/user",router)

app.listen(PORT ,()=>{
console.log(`server is running on PORT ${PORT}`)
})