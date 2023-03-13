const router = require('express').Router();
const passport = require('passport');
const { genGoogleJWT } = require('../controllers/authController.ts');

router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile']
}));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    // res.send('wasss uppppp');
    genGoogleJWT(req, res);
});

module.exports = router;