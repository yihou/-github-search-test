import {SearchIndex} from '../models/SearchIndex';
import {Request} from 'express';

interface PaginationParams {
    page?: number;
}

export class ReportController {
    static async searchIndexList(req: Request<any, any, any, PaginationParams>, res) {
        try {
            const searchIndexList = await SearchIndex.paginate();
            res.json(searchIndexList);
        } catch (e) {
            res.json(e);
        }
    }
}
