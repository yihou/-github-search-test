import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';
import {ISearchResultType} from './SearchResult';

export interface ISearchIndexType extends Document {
    searchResult?: ISearchResultType[];
    createdAt?: Date;
    searchString: string;
}

const SearchIndexSchema = new mongoose.Schema({
    searchResult: [Schema.Types.ObjectId],
    createdAt: {type: Date, required: true, default: new Date()},
    searchString: {type: String, required: true, default: null},
});

export const SearchIndex = mongoose.model<ISearchIndexType>('search_index', SearchIndexSchema);
