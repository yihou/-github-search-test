const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
import {config} from 'dotenv';

export const env = config({
    path: '../../.env',
});

module.exports = withPlugins([
    [withImages],
], {
    env: {
        SERVER_PORT: process.env.SERVER_PORT,
    },
});
