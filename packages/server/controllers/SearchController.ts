import {SearchIndex} from '../models/SearchIndex';
import {ISearchResultType, SearchResult} from '../models/SearchResult';
import {Search} from '../services/Search';
import {Request} from 'express';
import {SearchParams} from '../../../types/search';

export class SearchController {
    static async autoComplete(req: Request<any, any, any, SearchParams>, res) {
        if (!req.query.query) {
            res.json([]);

            return;
        }

        try {
            const searchIndexList = await SearchIndex.find({
                searchString: {
                    '$regex': req.query.query,
                },
            });
            res.json(searchIndexList.map<string>(searchIndex => searchIndex.searchString));
        } catch (e) {
            res.json(e);
        }
    }

    static async search(req: Request<any, any, any, SearchParams>, res) {
        const searchService = new Search();

        if (!req.query.query) {
            return res.json({
                nodes: [],
            });
        }

        try {
            const searchResponse = await searchService.search(req.query);

            console.log(searchResponse.search);

            // after responded, index queries and search results
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

            let searchIndex = await SearchIndex.findOne({
                searchString: req.query.query,
            });

            if (!searchIndex) {
                await SearchIndex.create({
                    searchString: req.query.query,
                    createdAt: new Date(),
                    searchResult: resultList,
                });
            }

            res.json(searchResponse.search);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    }
}
