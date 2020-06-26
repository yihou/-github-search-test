import {SearchIndex} from '../models/SearchIndex';
import {ISearchResultType, SearchResult} from '../models/SearchResult';
import {Search} from '../services/Search';

export class SearchController {
    static async autoComplete(req, res) {
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
    }

    static async search(req, res) {
        const searchService = new Search();

        try {
            const searchResponse = await searchService.search(req.query);
            res.json(searchResponse.search);

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

            await SearchIndex.create({
                searchString: req.query.query,
                createdAt: new Date(),
                searchResult: resultList,
            });
        } catch (e) {
            res.json(e);
        }
    }
}
