import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./items/items.router";
import { dbUrl } from "../config/db";
import mongoose from "mongoose";

import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import process from 'process';


dotenv.config();


if (!process.env.PORT) {
    process.exit(1);
 }

 mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true},(err:any)=>{
  if(err){
      console.log(err)
  }else{
      console.log("Database connected ....")
  }
});



 
 const PORT: number = parseInt(process.env.PORT as string, 10);

 console.log(PORT)
 
 const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/app/users", userRouter);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

 



