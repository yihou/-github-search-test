import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import {env} from './utils/env';
import {dbConnect} from './utils/mongodb';
import {SearchParams} from '../../types/search';
import {SearchController} from './controllers/SearchController';
import {AuthController} from './controllers/AuthController';
import {authenticate, jwtStrategy} from './utils/passport';
import {ReportController} from './controllers/ReportController';
import {urlencoded, json, text} from 'body-parser';

const app: express.Application = express();

app.use(cors({
    origin: '*',
}));

const main = async () => {
    await dbConnect();

    passport.use(jwtStrategy());
    app.use(passport.initialize());

    // parse json and x-www-form-urlencoded
    app.use(urlencoded({
        extended: true
    }));
    app.use(json());
    app.use(text());

    app.get<any, any, any, SearchParams>('/search-autocomplete', SearchController.autoComplete);
    app.post<any, any, any, SearchParams>('/search', SearchController.search);

    app.post('/login', AuthController.login);

    const protectedRoutes = express.Router();
    protectedRoutes.use(authenticate);
    protectedRoutes.get<any, any, any, SearchParams>(
        '/report/search-list',
        ReportController.searchIndexList
    );

    app.use(protectedRoutes);

    app.listen(env.parsed.SERVER_PORT, () => {
        console.log(`Server started`);
    });
};

// noinspection JSIgnoredPromiseFromCall
main();
