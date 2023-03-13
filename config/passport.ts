const fs = require('fs');
const passport = require('passport');
const jwt = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20');
const dotenv = require('dotenv');
const addUser = require('../controllers/authController.ts');
const UserDB = require('../schemas/UserSchema.ts');

dotenv.config({ path: './config/config.env' });
const PUB_KEY = fs.readFileSync('./keys/id_rsa_pub.pem', 'utf8');


// passport.serializeUser((user, done) => {
//     done(null, user.googleID);
// });

passport.use(
    new GoogleStrategy({
        callbackURL: '/api/v0/auth/google/callback',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        addUser.addUser(profile, done);
    })
);

passport.use(
    new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: PUB_KEY,
        algorithms: ['RS256']
    }, (payload, done) => {
        UserDB.findById(payload.sub)
            .then(user => {
                if(user){
                    done(null, user);
                }
                else{
                    done(null, false);
                }
            })
            .catch(err => done(err, false))
    })
);
