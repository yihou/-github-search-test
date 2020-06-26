import * as express from 'express';
import * as cors from 'cors';
import {Search} from './services/Search';
import {SearchParams} from '../../types/search';
import {env} from './utils/env';
import {dbConnect} from './utils/mongodb';
import {SearchIndex} from './models/SearchIndex';
import {ISearchResultType, SearchResult} from './models/SearchResult';

const app: express.Application = express();

app.use(cors({
    origin: '*',
}));

const main = async () => {
    await dbConnect();
    const searchService = new Search();

    app.listen(env.parsed.SERVER_PORT, () => {
        console.log(`Server started`);
    });

    app.get<any, any, any, SearchParams>('/search-autocomplete', async function (req, res) {
        try {
            const searchIndex = await SearchIndex.find({
                title: {
                    '$regex': req.query.query,
                },
            });
            console.log(searchIndex);

            res.json(searchIndex);
        } catch (e) {
            res.json(e);
        }
    });

    app.post<any, any, any, SearchParams>('/search', async function (req, res) {
        try {
            const searchResponse = await searchService.search(req.query);
            res.json(searchResponse.search);

            const resultList = await Promise.all(searchResponse.search.nodes.map<Promise<ISearchResultType>>(async (node) => {
                let result = await SearchResult.findOne({
                    github_id: node.id,
                });

                if (!result) {
                    result = await SearchResult.create({
                        github_id: node.id,
                        title: node.name,
                    });
                }

                return result._id;
            }));

            await SearchIndex.create({
                searchString: req.query.query,
                createdAt: new Date(),
                searchResult: resultList,
            });
        } catch (e) {
            res.json(e);
        }
    });
};

// noinspection JSIgnoredPromiseFromCall
main();
