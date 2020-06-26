import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import {env} from './utils/env';
import {dbConnect} from './utils/mongodb';
import {SearchParams} from '../../types/search';
import {SearchController} from './controllers/SearchController';
import {AuthController} from './controllers/AuthController';
import {jwtStrategy} from './utils/passport';
import {ReportController} from './controllers/ReportController';

const app: express.Application = express();

app.use(cors({
    origin: '*',
}));

const main = async () => {
    await dbConnect();

    passport.use(jwtStrategy());
    app.use(passport.initialize());
    app.listen(env.parsed.SERVER_PORT, () => {
        console.log(`Server started`);
    });

    app.get<any, any, any, SearchParams>('/search-autocomplete', SearchController.autoComplete);
    app.post<any, any, any, SearchParams>('/search', SearchController.search);

    app.post<any, any, any, SearchParams>('/login', AuthController.login);
    app.get<any, any, any, SearchParams>(
        '/report/search-list',
        passport.authenticate('jwt'),
        ReportController.searchIndexList
    );
};

// noinspection JSIgnoredPromiseFromCall
main();
