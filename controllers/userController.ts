const UserDB = require('../schemas/UserSchema.ts');
const utils = require('../lib/passwordUtils.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');


exports.registerUser = async (req, res) => {
    const saltHash = utils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    // Need to find a way to insure that the username is unique without using Mongoose schema

    try{
        const newUser = await UserDB.create({
            username: req.body.username,
            hash,
            salt
        });
        if(newUser){
            const tokenObj = utils.issueJWT(newUser);

            res.status(200).json({
                status: true,
                token: tokenObj.token,
                expiresIn: tokenObj.expiresIn
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.loginUser = async (req, res) => {
    try{
        const user = await UserDB.findOne({ username: req.body.username });

        if(!user){
            res.status(401).json({status: false, error: "Could not find user"});
        }

        if(utils.validPassword(req.body.password, user.hash, user.salt)){
            const tokenObj = utils.issueJWT(user);

            delete user._doc._id;
            delete user._doc.salt;
            delete user._doc.hash;
            
            res.status(200).json({
                status: true,
                user,   // Take salt and hash out
                token: tokenObj.token,
                expiresIn: tokenObj.expiresIn
            });
        }
        else{
            res.status(401).json({status: false, error: "Incorrect password"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.getProfile = async (req, res) => {
    const token = req.rawHeaders[1].split(" ")[1];

    if(!token){
        console.log("Barere Token could not be found");
        res.status(400).json({status: false, error: "Barere Token could not be found"});
    }

    try{
        const PUB_KEY = fs.readFileSync('./keys/id_rsa_pub.pem', 'utf8');
        const userID = jwt.verify(token, PUB_KEY).sub;

        if(userID == null){
            res.status(400).json({
                status: false,
                error: "Unable to find userID"
            });
        }

        const user = await UserDB.findById(userID);

        if(user == null){
            res.status(400).json({
                status: false,
                error: "Unable to find user"
            });
        }
        else{
            delete user._doc.salt;
            delete user._doc.hash;

            res.status(200).json({
                status: true,
                user
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.updateProfile = async (req, res) => {
    if(!req.body){
        res.status(400).json({
            status: false,
            error: "Enter data to be updated"
        });
    }

    const token = req.rawHeaders[1].split(" ")[1];

    if(!token){
        console.log("Barere Token could not be found");
        res.status(400).json({status: false, error: "Barere Token could not be found"});
    }

    try{
        const PUB_KEY = fs.readFileSync('./keys/id_rsa_pub.pem', 'utf8');
        const userID = jwt.verify(token, PUB_KEY).sub;

        if(userID == null){
            res.status(400).json({
                status: false,
                error: "Unable to find userID"
            });
        }

        const user = await UserDB.findByIdAndUpdate(userID, req.body);

        if(user == null){
            res.status(400).json({
                status: false,
                error: "User can not be found"
            });
        }
        else{
            res.status(200).json({
                status: true,
                goodNews: "User profile has been updated!"
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.deleteProfile = async (req, res) => {
    const token = req.rawHeaders[1].split(" ")[1];

    if(!token){
        console.log("Barere Token could not be found");
        res.status(400).json({status: false, error: "Barere Token could not be found"});
    }

    try{
        const PUB_KEY = fs.readFileSync('./keys/id_rsa_pub.pem', 'utf8');
        const userID = jwt.verify(token, PUB_KEY).sub;

        if(userID == null){
            res.status(400).json({
                status: false,
                error: "Unable to find userID"
            });
        }

        const user = UserDB.findByIdAndRemove(userID);

        if(user == null){
            res.status(400).json({
                status: false,
                error: "Unable to find user"
            });
        }
        else{
            delete user._doc.salt;
            delete user._doc.hash;

            res.status(200).json({
                status: true,
                msg: `User of username: ${user.username}`,
                user
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}
