import {FormControl} from 'baseui/form-control';
import {Combobox} from 'baseui/combobox';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useApi} from '../hooks/useApi';
import {SearchParams} from '../../../types/search';
import {OnChangeParams, OptionsT, Value} from 'baseui/select';
import {Tag} from 'baseui/tag';
import {LanguageSelect} from './LanguageSelect';
import {Cell, Grid} from 'baseui/layout-grid';
import {styled} from 'baseui';

interface SearchFormParams {
    isLoading?: boolean;
    hashId?: string;
    onSearch: (value: SearchParams) => void;
}

export const LanguageTopSpacer = styled('div', {
    paddingTop: '33px',
});

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

    // language select
    const [selectedLanguage, setSelectedLanguage] = useState<Value>([]);

    function handleOnSelect(param: OnChangeParams) {
        setSelectedLanguage(param.value);
    }


    useEffect(() => {
        props.onSearch({
            query: searchStr,
            language: (selectedLanguage[0] || {}).id as string,
        });
    }, [searchStr, selectedLanguage])

    function handleOnSubmit(e) {
        e.preventDefault();
        props.onSearch({
            query: searchStr,
            language: (selectedLanguage[0] || {}).id as string,
        });
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

    function mapOptionToNode({option}) {
        return (
            <div>
                {option.label}
                {option.label.indexOf('topic:') === 0 && (
                    <Tag closeable={false} kind="accent">topic</Tag>
                )}
            </div>
        )
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <Grid gridGutters={0} gridMargins={0}>
                <Cell span={[3,6,9]}>
                    <FormControl
                        label="Search Github Repos here!!"
                        caption="Start typing..."
                    >
                        <Combobox
                            value={searchStr}
                            onChange={handleOnChange}
                            mapOptionToString={(option) => option.label}
                            mapOptionToNode={mapOptionToNode}
                            options={autoCompleteList}
                            name={`repo_search_${hashId}`}
                            autocomplete={false}
                        />
                    </FormControl>
                </Cell>
                <Cell span={[1,2,3]}>
                    <LanguageTopSpacer/>
                    <FormControl>
                        <LanguageSelect
                            value={selectedLanguage}
                            onSelect={handleOnSelect}
                        />
                    </FormControl>
                </Cell>
            </Grid>
        </form>
    )
}
