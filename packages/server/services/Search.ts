import {GraphQlResponse} from '@octokit/graphql/dist-types/types';
import {githubGraphQuery} from '../utils/github';

interface SearchParams {
    query: string;
    topic?: string;
    language?: string;
}

interface SearchItem {
    id: string;
    name: string;
}

interface SearchResponseData {
    search: {
        repositoryCount: number;
        nodes: SearchItem[];
        pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        }
    }
}

export class Search {
    searchQuery = `query searchRepos($searchStr: String!, $first: Int!, $after: String) {
        search(
            query: $searchStr,
            type: REPOSITORY,
            first: $first,
            after: $after
        ) {
            repositoryCount
            nodes {
                ... on Repository {
                    id
                    name
                }
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
            }
            edges {
                textMatches
            }
        }
      }
    `

    protected searchStringConstructor(params: SearchParams): string {
        const topicStr = params.topic ? `topic:${params.topic}` : '';
        const languageStr = params.language ? `language:${params.language}` : '';

        return `${params.query} ${topicStr} ${languageStr}`.trim();
    }

    async search(params: SearchParams): GraphQlResponse<SearchResponseData> {
        return await githubGraphQuery<SearchResponseData>({
            query: this.searchQuery,
            searchStr: this.searchStringConstructor(params),
            first: 10,
            after: null,
        });
    }
}
