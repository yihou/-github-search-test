import * as mongoose from 'mongoose';
import {env} from './env';
import {SearchIndex} from '../models/SearchIndex';
import {SearchResult} from '../models/SearchResult';

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

        await SearchIndex.createCollection();
        await SearchResult.createCollection();
    } catch (err) {
        console.error('mongodb connection error:');
        console.error(err);
    }

    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${env.parsed.DATABASE_NAME}`);
    });

    return mongoose;
}
