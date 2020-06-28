import {SearchIndex} from '../models/SearchIndex';
import {ISearchResultType, SearchResult} from '../models/SearchResult';
import {Search, SearchResponseData} from '../services/Search';
import {Request} from 'express';
import {SearchParams} from '../../../types/search';
import _ = require('lodash');

export class SearchController {
    static defaultSearchResponse = {
        nodes: [],
        pageInfo: {
            startCursor: null,
            endCursor: null,
            hasPreviousPage: false,
            hasNextPage: false,
        }
    };

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
            }).limit(3);

            // append topic filter in suggestions
            const searchSuggestionStringList = [];
            searchIndexList.forEach(searchIndex => {
                if (searchIndex.searchString.indexOf('topic:') !== 0) {
                    searchSuggestionStringList.push(searchIndex.searchString, `topic:${searchIndex.searchString}`);
                }
            });

            res.json(searchSuggestionStringList);
        } catch (e) {
            res.json(e);
        }
    }

    static async search(req: Request<any, any, any, SearchParams>, res) {
        const searchService = new Search();

        if (!req.query.query) {
            return res.json(SearchController.defaultSearchResponse);
        }

        try {
            const searchResponse = await searchService.search(req.query);

            // indexing search string
            await SearchController.postSearch(req.query, searchResponse);

            res.json(_.defaults(
                searchResponse.search,
                SearchController.defaultSearchResponse,
            ));
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    }

    static async postSearch(searchQuery: SearchParams, searchResponse: SearchResponseData) {
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
            searchString: searchQuery.query,
        });

        if (!searchIndex) {
            await SearchIndex.create({
                searchString: searchQuery.query,
                createdAt: new Date(),
                searchResult: resultList,
            });
        } else {
            // add existing list into it
            searchIndex.searchResult = _.uniq([
                ...searchIndex.searchResult.map(item => item._id),
                ...resultList,
            ])
            searchIndex.updateOne(searchIndex, function (err, res) {
                console.log(err, res);
            });
        }
    }
}
