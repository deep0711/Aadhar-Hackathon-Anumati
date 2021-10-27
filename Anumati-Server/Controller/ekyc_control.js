var fs = require('fs');
var atob = require('atob');
const unzipper = require('unzipper');
const {unlink} = require('fs').promises;
var parser = require('xml2json');


exports.unzipKYC = async (req,res) => {
    try{
        const base64xml = req.body.base64xml;
        const filename = req.body.filename;

        var binary_string = atob(base64xml);
        var len = binary_string.length;

        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }

        fs.writeFile(filename,bytes,function(err){
            if(err)
            console.log("Error occured",err);
            else{
            console.log("File is created successfully");
            }    
        })

        const directory = await unzipper.Open.file('./'+filename);
        const extracted = await directory.files[0].buffer('2469');
        const xmldata = extracted.toString();

        var json = parser.toJson(xmldata);

        await unlink('./'+filename);
        console.log("File Deleted successfully");

        res.send({message:'Successful Data Unzipping',data:json})
    }catch(err){
        console.log("Error while Unzipping KYC",err);
        res.send({ error : 'Server Error.Try Again'});
    }
}