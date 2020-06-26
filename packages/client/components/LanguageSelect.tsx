// import {Button} from 'baseui/button';
import * as React from 'react';
import {OnChangeParams, Select} from 'baseui/select';

export type OptionT = { label: string; id: string };

interface LanguageSelectProps {
    value?: any;
    onSelect: (value: OnChangeParams) => any;
}

export function LanguageSelect(props: LanguageSelectProps) {
    return (
        <Select
            value={props.value}
            onChange={props.onSelect}
            placeholder="Language"
            getValueLabel={({option}) => option.label}
            options={[]}
            size="mini"
            backspaceRemoves={true}
            clearable={false}
        />
    )
}
