export interface SearchParams {
    query: string;
    topic?: string;
    language?: string;
    before?: string;
    after?: string;
}

export interface SearchItem {
    id: string;
    name: string;
}
