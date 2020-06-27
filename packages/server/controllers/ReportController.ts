import {SearchIndex} from '../models/SearchIndex';
import {Request} from 'express';

interface PaginationParams {
    page?: string;
}

export class ReportController {
    static async searchIndexList(req: Request<any, any, any, PaginationParams>, res) {
        try {
            const searchIndexList = await SearchIndex.paginate({}, {
                page: parseInt(req.query.page),
            });
            res.json(searchIndexList);
        } catch (e) {
            res.json(e);
        }
    }
}
