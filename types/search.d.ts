export interface SearchParams {
    query: string;
    topic?: string;
    language?: string;
    before?: string;
    after?: string;
}

export interface SearchResultGraphQLItem {
    id: string;
    name: string;
    nameWithOwner: string;
    url: string;
    description: string;
    stargazers: {
        totalCount: number;
    }
    forks: {
        totalCount: number;
        totalDiskUsage: number;
    }
    owner: {
        id: string;
        avatarUrl: string;
        url: string;
        login: string;
    };
    createdAt: Date;
    primaryLanguage: {
        name: string;
        color: string;
    };
}

export interface SearchResultItem {
    githubId: string;
    name: string;
    nameWithOwner: string;
    url: string;
    description: string;
    owner: {
        id: string;
        avatarUrl: string;
        url: string;
        login: string;
    };
    createdAt: Date;
    primaryLanguage: {
        name: string;
        color: string;
    };
}
