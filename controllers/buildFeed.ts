const jwt = require('jsonwebtoken');
const fs = require('fs');
const UserDB = require('../schemas/UserSchema.ts');


exports.buildFeed = async (req, res) => {
    // Get userID
    const token = req.rawHeaders[1].split(" ")[1];
    const PUB_KEY = fs.readFileSync('./keys/id_rsa_pub.pem', 'utf8');

    if(!token){
        console.log("Barere Token can not be found");
        res.status(400).json({status: false, error: "Barere Token can not be found"});
    }

    const userID = jwt.verify(token, PUB_KEY).sub;

    if(userID == null){
        res.status(400).json({
            status: false,
            error: "Unable to find userID"
        });
    }

    try{
        const user = UserDB.findById(userID);
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }

    res.send("wasssss uppppp");
}
