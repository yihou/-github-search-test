import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import {SearchResultItem} from '../../../types/search';

export interface ISearchResultType extends SearchResultItem, Document {}

const SearchResultSchema = new mongoose.Schema({
    githubId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    nameWithOwner: {type: String, required: true},
    url: {type: String, required: true},
    owner: {type: Object, default: null, required: true},
    createdAt: {type: Date, default: null, required: true},
    primaryLanguage: {type: Object, default: null},
});

export const SearchResult = mongoose.model<ISearchResultType>('search_result', SearchResultSchema);
