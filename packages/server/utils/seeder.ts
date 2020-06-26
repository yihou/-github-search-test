import {User} from '../models/User';
import * as bcrypt from 'bcrypt-nodejs';

export async function dbSeeder() {
    const user = await User.findOne({
        email: 'admin@sample.com',
    });

    if (!user) {
        await User.create({
            email: 'admin@sample.com',
            password: bcrypt.genSaltSync(123123),
        });
    }
}
