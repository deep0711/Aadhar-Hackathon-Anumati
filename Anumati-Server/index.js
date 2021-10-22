const express =  require('express');
const app = express();
const port = 8000;

app.get('/',(req,res)=>{
    res.send("Project is Setting up....");
})

app.listen(port,()=>{
    console.log("Server is listening on port ",port);
})