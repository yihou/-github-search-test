import {User} from '../models/User';
import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import * as passport from 'passport';

export function jwtStrategy() {
    const opts: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };
    return new Strategy(opts, async function (payload, callback) {
        try {
            const user = await User.findOne({id: payload.sub});

            if (user) {
                callback(null, user);
            } else {
                callback(null, false);
            }
        } catch (err) {
            return callback(err, false);
        }
    });
}

export function authenticate(req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Token does not match.',
            });
        }

        if (!user) {
            return res.json({
                success: false,
                message: 'User not authorized.',
            });
        }

        req.user = user;
        next();

    })(req, res, next);
}
