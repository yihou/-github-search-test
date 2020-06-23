import * as express from 'express';
const app: express.Application = express();

const main = async () => {
    app.listen(3001, () => {
        console.log(`Server started`);
    });
};

// noinspection JSIgnoredPromiseFromCall
main();
