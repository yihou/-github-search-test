import * as React from 'react';
import {OnChangeParams, Select} from 'baseui/select';
import Fuse from 'fuse.js';

export type OptionT = { label: string; id: string };

const languageList = require('../static/languages_simplified.json').map(name => ({
    label: name,
    id: name,
}))

const languageSearch = new Fuse(languageList, {
    keys: ['label'],
    distance: 5,
})

interface LanguageSelectProps {
    value?: any;
    onSelect: (value: OnChangeParams) => any;
}

function debounce(fn: any, delay: number) {
    let timeoutId: any;
    function debounced(...args: any) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    }
    return debounced;
}

export function LanguageSelect(props: LanguageSelectProps) {
    const [options, setOptions] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleInputChange = debounce(function(searchString: string) {
        if (!searchString) {
            setOptions([]);
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            const nextOptions = languageSearch.search<OptionT>(searchString).map(item => item.item);

            setOptions(nextOptions);
            setIsLoading(false);
        }, 1000);
    }, 400);

    return (
        <Select
            isLoading={isLoading}
            value={props.value}
            onChange={props.onSelect}
            placeholder="Language"
            getValueLabel={({option}) => option.label}
            options={options}
            onInputChange={(event: React.SyntheticEvent) => {
                const target = event.target as HTMLInputElement;
                handleInputChange(target.value);
            }}
            backspaceRemoves={true}
            clearable={false}
        />
    )
}
