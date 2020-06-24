import {graphql} from '@octokit/graphql';
import {env} from './env';
import {GraphQlResponse, RequestParameters} from '@octokit/graphql/dist-types/types';

export const graphqlWithAuth = graphql.defaults({
    headers: {
        authorization: `token ${env.parsed.GITHUB_ACCESS_TOKEN}`,
    },
});

export async function githubGraphQuery<ResponseData>(
    params: RequestParameters,
): GraphQlResponse<ResponseData> {
    try {
        return await graphqlWithAuth(params);
    } catch (e) {
        return e;
    }
}
