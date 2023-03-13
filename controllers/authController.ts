const UserDB = require('../schemas/UserSchema.ts');
const jwt = require('jsonwebtoken');
const utils = require('../lib/passwordUtils.js');


exports.addUser = async (profile, done) => {
    const userInfo = {
        username: profile.displayName,
        googleID: profile.id,
        profileImage: profile.photos[0].value
    }

    try{
        if((await UserDB.find({googleID: userInfo.googleID})) !== null){
            console.log('This user alredy exsists');
        }
        else{
            const user = await UserDB.create(userInfo);
            console.log('User added to DB');
        }
        done(null, userInfo);
    }
    catch(err){
        console.log(err);
        done(err, false);
    }
}

exports.genGoogleJWT = async (req, res) => {
    try{
        const user = await UserDB.find({ googleID: req.user.googleID});

        if(user){
            const tokenObj = utils.issueJWT(user);

            res.status(200).json({
                status: true,
                user,
                token: tokenObj.token,
                expiresIn: tokenObj.expiresIn
            });
        }
        else{
            res.status(401).json({status: false, error: "Google ID not found"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}
