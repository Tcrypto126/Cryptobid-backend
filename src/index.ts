import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/UserRoutes";
const PORT = process.env.PORT || 5000;

//Connect to database
import "./config/db";

const app=express();
app.use('/api/user',userRouter)

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/',(req,res)=>{
res.send('Server created successfully!');
})

app.listen(PORT,()=>console.log(`Server running on Port: ${PORT}`));