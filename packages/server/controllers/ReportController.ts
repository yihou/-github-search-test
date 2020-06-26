import {SearchIndex} from '../models/SearchIndex';
import {Request} from 'express';

interface PaginationParams {
    page?: number;
}

export class ReportController {
    static async searchIndexList(req: Request<any, any, any, PaginationParams>, res) {
        if (!req.query.page) {
            res.json([]);

            return;
        }

        try {
            const searchIndexList = await SearchIndex.find();
            res.json(searchIndexList.map<string>(searchIndex => searchIndex.searchString));
        } catch (e) {
            res.json(e);
        }
    }
}
