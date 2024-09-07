import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import { dbConnection } from './database/dbConnection.js';
import {errorMiddleware} from './middlewares/error.js';

const app=express()
dotenv.config({path:"./config/config.env"});


app.use(cors({
    origin: 'https://job-seeker-client.vercel.app',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}));

// app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}));

app.use('/api/v1/users',userRouter);
app.use('/api/jobs',jobRouter);
app.use('/api/application',applicationRouter);

dbConnection();

app.use(errorMiddleware);

export default app;