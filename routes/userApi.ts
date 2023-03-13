const router = require('express').Router();
const passport = require('passport');
const users = require('../controllers/userController.ts');

router
    .route('/register')
    .post(users.registerUser);

router
    .route('/login')
    .post(users.loginUser);

router
    .route('/profile/delete')
    .delete(passport.authenticate('jwt', {session: false}), users.deleteProfile);

router
    .route('/profile')
    .get(passport.authenticate('jwt', {session: false}), users.getProfile)
    .put(passport.authenticate('jwt', {session: false}), users.updateProfile);


module.exports = router;