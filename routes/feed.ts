const router = require('express').Router();
const feedBuilder = require('../controllers/buildFeed.ts');
const passport = require('passport');


router
    .route('/test')
    .get(passport.authenticate('jwt', {session: false}), feedBuilder.buildFeed);


module.exports = router;