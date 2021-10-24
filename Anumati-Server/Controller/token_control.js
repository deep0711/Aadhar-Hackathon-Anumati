const Token = require('../models').Token;

exports.storeToken = async function(req,res){
    try{
        const data = {
            Aadhar:req.body.aadhar,
            Token:req.body.aadhar
        }

        const new_data = await Token.create(data);

        if(new_data == null)
            res.send({error:'Server Error. Try Again'});
        else
            res.send({message:'Token Stored Successfully'});     

    }catch(err){
        console.log("Error while Storing Address",err);
        res.send({ error : 'Server Error.Try Again'});
    }
}

exports.sendNotification = async function(aadhar,status){
    try{
        const data = await Token.findOne({where:{
            Aadhar:aadhar
        }});

        const response = await fetch('https://exp.host/--/api/v2/push/send',{
            method:'POST',
            headers:{
                'host': 'exp.host',
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json'
            },
            body:JSON.stringify({
                'to':data.Token,
                'title':'Anumati',
                'body':status
            })
        })

        console.log(response);
        
    }catch(err){
        console.log("Error while Storing Address",err);
    }
}