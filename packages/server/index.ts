import * as express from 'express';
import * as cors from 'cors';
import {SearchParams} from '../../types/search';
import {env} from './utils/env';
import {dbConnect} from './utils/mongodb';
import {SearchController} from './controllers/SearchController';

const app: express.Application = express();

app.use(cors({
    origin: '*',
}));

const main = async () => {
    await dbConnect();

    app.listen(env.parsed.SERVER_PORT, () => {
        console.log(`Server started`);
    });

    app.get<any, any, any, SearchParams>('/search-autocomplete', SearchController.autoComplete);

    app.post<any, any, any, SearchParams>('/search', SearchController.search);
};

// noinspection JSIgnoredPromiseFromCall
main();
