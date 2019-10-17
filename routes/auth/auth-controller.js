const User = require('../../model/user');
const jwtController = require('../../src/jwt-controller');

module.exports = {
    register : async (request, response, next) => {
        try {
            const { id, password, nickname } = request.body;
            const provider = 'local';
            const user = await User.create( { id, password, nickname, provider } );
            await user.save();
            return response.send();
        } catch(error) {
            // mongodb user model 저장 중 ID, 닉네임 중복에러 발생하면 403 Error로 중복된 요소 전송.
            const duplicationErrorRegexp = /.*(duplicate key error).*index: (\w+)_. .*/;
            const duplicationErrorFragment = error.message.match(duplicationErrorRegexp);
            if(duplicationErrorFragment) {
                const duplicateElement = duplicationErrorFragment[2];
                return response.status(403).send(duplicateElement);
            }

            next(error);
        }
    },

    login : async (request, response, next) => {
        try {
            const { id, password } = request.body;
            const user = await User.findOneById(id);

            if (user && user.verify(password)) {
                const token = await jwtController.makeToken(user);
                response.cookie('jwt', token);
                return response.send();
            }

            return response.status(409).send("Invalid User");
        } catch(error) {
            next(error);
        }
    },

    logout : (request, response, next) => {
        try {
            response.clearCookie('jwt');
            return response.status(200).redirect('/login');   
        } catch(error) {
            next(error);
        }
    },

    googleAuthenticate : (passport) => {
        return passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] })
    },

    googleCallbackAuthenticate : (passport) => {
        return passport.authenticate('google', { failureRedirect: '/login' });
    },

    setTokenToCookie: (request, response) => {
        response.cookie('jwt', request.user.token);
        response.redirect('/');
    }
}