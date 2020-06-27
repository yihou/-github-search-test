const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const {config} = require('dotenv');

const env = config({
    path: '../../.env',
});

module.exports = withPlugins([
    [withImages],
], {
    env: {
        SERVER_PORT: env.parsed.SERVER_PORT,
    },
});
