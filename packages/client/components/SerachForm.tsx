import {FormControl} from 'baseui/form-control';
import {Combobox} from 'baseui/combobox';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useApi} from '../hooks/useApi';
import {SearchParams} from '../../../types/search';
import {OptionsT} from 'baseui/select';

interface SearchFormParams {
    isLoading?: boolean;
    hashId?: string;
    onSearch: (value: string) => void;
}

export function SearchForm(props: SearchFormParams) {
    const [hashId] = useState<string>(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5));
    const [searchStr, setSearchStr] = useState<string>('');
    const {data: autoCompleteList, debouncedCallApi: fetchList} = useApi<SearchParams, OptionsT[], any>({
        url: '/search-autocomplete',
        method: 'get',
        transformer(response) {
            return response.data.map(title => ({
                id: title,
                label: title,
            })) as any as OptionsT[];
        },
        initialState: {
            data: [],
        }
    });

    useEffect(() => {
        props.onSearch(searchStr);
    }, [searchStr])

    function handleOnSubmit(e) {
        e.preventDefault();
        props.onSearch(searchStr);
    }

    function handleOnChange(value) {
        setSearchStr(value);

        // noinspection JSIgnoredPromiseFromCall
        handleFetchOptions(value);
    }

    async function handleFetchOptions(query: string) {
        await fetchList({
            query,
        });
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <FormControl
                label="Search Github Repos here!!"
                caption="Start typing..."
            >
                <Combobox
                    value={searchStr}
                    onChange={handleOnChange}
                    mapOptionToString={(option) => option.label}
                    mapOptionToNode={({option}) => option.label}
                    options={autoCompleteList}
                    name={`repo_search_${hashId}`}
                    size="compact"
                    autocomplete={false}
                />
            </FormControl>
        </form>
    )
}
