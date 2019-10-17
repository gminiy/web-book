module.exports = (app) => {
    const passport = require('passport');
    const jwtController = require('../src/jwt-controller');
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const googleCredentials = require('../configs/google-config');
    const User = require('../model/user');

    app.use(passport.initialize());

    passport.serializeUser((user, done) => done(null, user));

    passport.use('google', new GoogleStrategy({
            clientID: googleCredentials.web.client_id,
            clientSecret: googleCredentials.web.client_secret,
            callbackURL: googleCredentials.web.redirect_uris[0]
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOneAndUpdate({ "id": profile.emails[0].value }, { $set:{"accessToken":accessToken } },{ new:true });
                if (user) {
                    user.token = await jwtController.makeToken(user);;
                } else {
                    const randomInt = +new Date();
                    const randomPassword = randomInt.toString();
                    [ id, password, nickname, provider ] = [ profile.emails[0].value, randomPassword, profile.displayName, 'google' ];
                    user = await User.create({ id, password, nickname, accessToken, provider });
                    await user.save();
                    user.token = await jwtController.makeToken(user);;
                }
                done(null, user);
            } catch (error) {
                console.log(error);
            }
        }));
    return passport;
}