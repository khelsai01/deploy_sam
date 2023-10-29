const express = require("express");
const { userRouter } = require("./Routes/user.routes");
const { connection } = require("./Connection/connection");
require("dotenv").config();
const cors = require("cors");
const { noteRouter } = require("./Routes/note.routes");
const jwt = require("jsonwebtoken")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notes",noteRouter)
app.use("/users",userRouter);

app.get("/refreshtoken",(req,res)=>{
    
    const refreshToken = req.headers.authorization?.split(" ")[1];
    try {
        if(refreshToken){
            let decode = jwt.verify(refreshToken,"refresh");
            if(decode){
                const newToken = jwt.sign({course:"nem11"},"newToken",{expiresIn:"2 minute"});
                res.status(200).send({"msg":"new token has been generated","newToken":newToken})
            }
            else {
                res.status(400).send({"msg":"invalid refrsh token, cannot generate a new authToken"})
            }
        }
        
    } catch (error) {
        
    }
})
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Server is connected to DB")
        console.log(`Server is is running at port ${process.env.port}`)

        
    } catch (error) {
        console.log(error)
    }
})