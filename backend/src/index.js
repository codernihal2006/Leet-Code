const express = require('express');
const app = express();
require('dotenv').config();
const main =  require('./config/db');
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit");
const aiRouter = require("./routes/aiChatting");
const videoRouter = require("./routes/videoCreator");
const cors = require('cors');

// console.log("Hello")

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.some(o => origin.startsWith(o))) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);


const InitalizeConnection = async ()=>{
    try{
        await main();
        console.log("MongoDB connected");

        try {
            await redisClient.connect();
            console.log("Redis connected");
        } catch (redisError) {
            console.error(`Redis disabled during startup: ${redisError.message}`);
        }
        
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number: "+ process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();
