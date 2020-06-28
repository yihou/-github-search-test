import {GraphQlResponse} from '@octokit/graphql/dist-types/types';
import {githubGraphQuery} from '../utils/github';
import {SearchParams, SearchResultGraphQLItem} from '../../../types/search';

export interface SearchResponseData {
    search: {
        repositoryCount: number;
        nodes: SearchResultGraphQLItem[];
        pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        }
    }
}

export class Search {
    searchQuery = `query searchRepos($searchStr: String!, $first: Int!, $before: String, $after: String) {
        search(
            query: $searchStr,
            type: REPOSITORY,
            first: $first,
            before: $before,
            after: $after
        ) {
            repositoryCount
            nodes {
                ... on Repository {
                    id
                    name
                    nameWithOwner
                    url
                    homepageUrl
                    description
                    stargazers {
                        totalCount
                    }
                    owner {
                        id
                        avatarUrl
                        url
                        login
                    }
                    forks {
                        totalCount
                        totalDiskUsage
                    }
                    primaryLanguage {
                        name
                        color
                    }
                    createdAt
              }
            }
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
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
            before: params.before,
            after: params.after,
        });
    }
}
