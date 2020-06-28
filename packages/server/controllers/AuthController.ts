import {Request} from 'express';
import * as jwt from 'jsonwebtoken';
import {User} from '../models/User';

interface LoginFields {
    email: string;
    password: string;
}

export class AuthController {
    static async login(req: Request<any, any, any, LoginFields>, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            });

            if (!user) {
                res.status(418).send({
                    success: false,
                    msg: 'Authentication failed.'
                });
            } else {
                // check if password matches
                const isMatch = user.comparePassword(req.body.password);

                if (isMatch) {
                    // if user is found and password is right create a token
                    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                        expiresIn: 604800 // 1 week
                    });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        auth_token: token,
                    });
                } else {
                    res.status(418)
                        .json({
                            success: false,
                            msg: 'Authentication failed.'
                        });
                }
            }
        } catch (e) {
            res.status(500).send({
                error: e,
                msg: 'Server error.',
            })
        }
    }
}
