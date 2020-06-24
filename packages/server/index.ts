import * as express from 'express';
import {graphql} from '@octokit/graphql';
import {env} from './utils/env';

export const graphqlWithAuth = graphql.defaults({
    headers: {
        authorization: `token ${env.parsed.GITHUB_ACCESS_TOKEN}`,
    },
});

const app: express.Application = express();

const main = async () => {
    app.listen(3001, () => {
        console.log(`Server started`);
    });

    app.post('/search', async function (req, res) {
        res.json(req.query);
    });
};

// noinspection JSIgnoredPromiseFromCall
main();
