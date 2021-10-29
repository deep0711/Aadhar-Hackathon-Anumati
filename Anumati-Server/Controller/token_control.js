const Token = require('../models').Token;
//const fetch = require('node-fetch');
const axios = require('axios');

exports.storeToken = async function(req,res){
    try{
        const data = {
            Aadhar:req.body.aadhar,
            Token:req.body.token
        }
        
        const response = await Token.findOne({where:{
            Aadhar:req.body.aadhar,
        }})
        var new_data;
        
        if(response == null)
            new_data = await Token.create(data);
        else{
            new_data = await Token.update(data,{
                where:{
                    'Aadhar':req.body.aadhar
                }
            })
        }
        
        if(new_data === null)
            res.send({error:'Server Error. Try Again'});
        else
            res.send({message:'Token Stored Successfully'});     

    }catch(err){
        console.log("Error while Token Address",err);
        res.send({ error : 'Server Error.Try Again'});
    }
}

exports.sendNotification = async function(aadhar,status){
    try{
        console.log("I am in SendNotification Part",aadhar);
        const data = await Token.findOne({where:{
            Aadhar:aadhar
        }});
        
        axios({
            method:'post',
            url:'https://exp.host/--/api/v2/push/send',
            headers:{
                'host': 'exp.host',
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json'
            },
            data:JSON.stringify({
                'to':data.Token,
                'title':'Anumati',
                'body':status
            })
        }).then(function(response){
            console.log("Notification Sending Response is ",response.status,response.data);
        })
        
    }catch(err){
        console.log("Error while Sending Notification",err);
    }
}