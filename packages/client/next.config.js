const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const {config} = require('dotenv');

config({
    path: '../../.env',
});

module.exports = withPlugins([
    [withImages],
], {
    env: {
        SERVER_PORT: process.env.SERVER_PORT,
    },
});
