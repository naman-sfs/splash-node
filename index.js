import express from "express";
import dotenv from "dotenv"
import generateQuestions from "./chat.js";

const Port = 5000;
dotenv.config();
const app = express();
app.use(express.json())

app.get('/',(req, res)=>{
    res.send("This is Express app")
})

app.post('/api/chat/questions',async (req,res)=>{
    try{
        let {gender,bio,interests} = req.body;

        if((!gender) || (!interests)){
            return res.send({"success":"false","msg":"missing field"})
        }
        interests = interests.join(', ')
        let result = await generateQuestions(gender,bio,interests)
        result = result.split('\n')
        result = result.map((ques) => ques.slice(3))
        return res.send({"success":"true","questions":result})
    }catch(err){
        return res.send({"success":"false","msg":"Internal Server Error"})
    }
    
})



app.listen(Port, () =>{
    console.log(`Server is listenting to the port ${Port}`);
})

