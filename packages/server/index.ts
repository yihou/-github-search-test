import * as express from 'express';
import {Search} from './services/Search';

const app: express.Application = express();

const main = async () => {
    const searchService = new Search();

    app.listen(3001, () => {
        console.log(`Server started`);
    });

    app.post('/search', async function (req, res) {
        try {
            const searchResponse = await searchService.search({
                query: req.query.query as string,
                language: req.query.language as string,
                topic: req.query.topic as string,
            });

            res.json(searchResponse.search);
        } catch (e) {
            res.json(e);
        }
    });
};

// noinspection JSIgnoredPromiseFromCall
main();
