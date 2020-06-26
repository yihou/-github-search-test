import {User} from '../models/User';

export async function dbSeeder() {
    const user = await User.findOne({
        email: 'admin@sample.com',
    });

    if (!user) {
        await User.create({
            email: 'admin@sample.com',
            password: '123123',
        });
    }
}
