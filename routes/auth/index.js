const router = require('express').Router();
const authController = require('./auth-controller');

module.exports = (passport) => {
    router.post('/register', authController.register);
    router.post('/login', authController.login);
    router.get('/logout', authController.logout);
    router.get('/google', authController.googleAuthenticate(passport));
    router.get('/google/callback', authController.googleCallbackAuthenticate(passport), authController.setTokenToCookie);
    return router;
}