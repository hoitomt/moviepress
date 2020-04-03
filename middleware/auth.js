const auth = require('../helpers/auth.js');

module.exports = {
    checkCookie: (req, res, next) => {
        const movieJWT = req.cookies.movie_press_token;
        if (movieJWT) {
            const tokenData = auth.validateToken(movieJWT);
            if (tokenData) {
                req.user = {
                    id: tokenData.id,
                    username: tokenData.username,
                    email: tokenData.email
                };
                next();
            } else {
                res.clearCookie('movie_press_token');
                res.redirect('/sign-in');
                req.user = null;
                next();
            }
        } else {
            req.user = null;
            next();
        }
    }
}
