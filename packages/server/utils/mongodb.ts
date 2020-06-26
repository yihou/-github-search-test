import * as mongoose from 'mongoose';
import {env} from './env';
import {SearchIndex} from '../models/SearchIndex';
import {SearchResult} from '../models/SearchResult';
import {User} from '../models/User';
import {dbSeeder} from './seeder';

/**
 * MongoDB Server
 **/
const mongodbUrl = `mongodb://localhost:${env.parsed.DATABASE_PORT}/${env.parsed.DATABASE_NAME}`

export async function dbConnect() {
    try {
        await mongoose.connect(
            mongodbUrl,
            {
                useNewUrlParser: true,
                auth: {
                    user: env.parsed.DATABASE_USERNAME,
                    password: env.parsed.DATABASE_PASSWORD,
                },
                useUnifiedTopology: true,
            }
        );

        await User.createCollection();
        await SearchIndex.createCollection();
        await SearchResult.createCollection();

        // noinspection ES6MissingAwait
        dbSeeder();
    } catch (err) {
        console.error('mongodb connection error:');
        console.error(err);
    }

    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${env.parsed.DATABASE_NAME}`);
    });

    return mongoose;
}
