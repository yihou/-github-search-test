import * as mongoose from 'mongoose';
import {Document} from 'mongoose';

export interface SearchResultType {
    github_id: string;
    title: string;
}

export interface ISearchResultType extends Document {
    github_id: string;
    title: string;
}

const SearchResultSchema = new mongoose.Schema({
    github_id: {type: String, required: true, default: null, unique: true},
    title: {type: String, required: true, default: null},
});

export const SearchResult = mongoose.model<ISearchResultType>('search_result', SearchResultSchema);
