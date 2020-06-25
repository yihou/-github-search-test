import * as express from 'express';
import * as cors from 'cors';
import {Search} from './services/Search';
import {SearchParams} from '../../types/search';
import {env} from './utils/env';

const app: express.Application = express();

const main = async () => {
    const searchService = new Search();

    app.use(cors({
        origin: '*',
    }));

    app.listen(env.parsed.SERVER_PORT, () => {
        console.log(`Server started`);
    });

    app.post<any, any, any, SearchParams>('/search', async function (req, res) {
        try {
            const searchResponse = await searchService.search(req.query);

            res.json(searchResponse.search);
        } catch (e) {
            res.json(e);
        }
    });
};

// noinspection JSIgnoredPromiseFromCall
main();
