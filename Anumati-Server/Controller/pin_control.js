const PIN = require('../models').Pin;

exports.storePin = async function(req,res){
    try{
        let record = await PIN.findOne({where: {'aadharNumber':req.body.aadhar}});

        if(record == null){
            const data = {
                aadharNumber : req.body.aadhar,
                pinNumber : req.body.pin
            }

            const new_data = await PIN.create(data);
            
            if(new_data == null)
                res.send({error:'Server Error.Try Again'});
            else{
                res.send({message:'PIN created successfully!'});
            }       
        }else{
            res.send({message:'Pin for this Aadhar Number already exist!'});
        }
    }catch(err){
        console.log("Error while storing PIN",err);
        res.send({ error : 'Server Error.Try Again'});
    }
}

exports.getPin = async function(req,res){
    try{
        let record = await PIN.findOne({where:{'aadharNumber':req.body.aadhar}});

        if(record == null){
            res.send({message:'Pin for this Aadhar Number does not exist!'});
        }else{
            res.send({pin:record.pinNumber,message:'PIN received successfully'});
        }
    }catch(err){
        console.log("Error occured while Retreiving PIN", err);
        res.send({error:'Server Error.Try Again'});
    }
}