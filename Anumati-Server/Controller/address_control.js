const Address =  require('../models').Address;

exports.storeAddress = async function(req,res){
    try{
        const data = {
            ConsentID : req.body.ConsentID,
            GaurdianName : req.body.GaurdianName,
            GaurdianType : req.body.GaurdianType,
            HouseNumber : req.body.HouseNumber,
            StreetName : req.body.StreetName,
            Landmark : req.body.Landmark,
            Area : req.body.Area,
            Village : req.body.Village,
            District : req.body.District,
            PostOffice : req.body.PostOffice,
            State : req.body.State,
            PinCode : req.body.PinCode
        }

        const new_data = await Address.create(data);

        if(new_data == null)
            res.send({error:'Server Error. Try Again'});
        else
            res.send({message:'Adress Shared Successfully'});     

    }catch(err){
        console.log("Error while Storing Address",err);
        res.send({ error : 'Server Error.Try Again'});
    }
}

exports.updateAdress = async function(req,res){
    try{
        const new_data = {
            GaurdianName : req.body.GaurdianName,
            GaurdianType : req.body.GaurdianType,
            HouseNumber : req.body.HouseNumber,
        }
        
        const result = await Address.update(new_data,{
            where : {
                ConsentID : req.body.ConsentID
            }
        });

        if(result == null)
            res.send({error:'Server Error.Try Again'});
        else
            res.send({message:'Address Updated Successfully'});
        
    }catch(err){
        console.log("Error while Updating Address",err);
        res.send({ error : 'Server Error.Try Again'});
    }
}

exports.getAdress = async function(req,res){
    try{
        const result = await Address.findOne({where:{
            ConsentID : req.body.ConsentID
        }});

        if(result == null)
            res.send({message:'Address yet not shared by landlord'});
        else
            res.send(result);    

    }catch(err){
        console.log("Error while Retreiving Address",err);
        res.send({ error : 'Server Error.Try Again'});
    }
}