import {User} from '../models/User';
import {Strategy, ExtractJwt} from 'passport-jwt'

export function jwtStrategy() {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: process.env.JWT_SECRET,
    };
    return new Strategy(opts, function (payload, callback) {
        console.log('payload: ', payload);
        User.findOne({id: payload.id}, function (err, user) {
            if (err) {
                return callback(err, false);
            }
            if (user) {
                callback(null, user);
            } else {
                callback(null, false);
            }
        });
    });
}
