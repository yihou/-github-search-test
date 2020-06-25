import {FormControl} from 'baseui/form-control';
import {Combobox} from 'baseui/combobox';
// import {Button} from 'baseui/button';
import * as React from 'react';

export type OptionT = { label: string; id: string };

interface SearchFormParams {
    value: string;
    onChange: (value) => void;
    onSubmit: () => void
}

function mapOptionToString(option: OptionT): string {
    return option.label;
}

export function SearchForm(props: SearchFormParams) {
    function handleOnSubmit(e) {
        e.preventDefault();

        props.onSubmit();
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                <FormControl
                    label="Search Github Repos here!!"
                    caption="Start typing..."
                >
                    <Combobox
                        value={props.value}
                        onChange={props.onChange}
                        mapOptionToString={mapOptionToString}
                        options={[]}
                        name="search"
                        size="compact"
                        autocomplete={false}
                    />
                </FormControl>
            </div>
            {/*<div>
                <Button type="submit" size="compact">
                    Search
                </Button>
            </div>*/}
        </form>
    )
}
