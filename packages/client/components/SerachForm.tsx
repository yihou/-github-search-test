import {FormControl} from 'baseui/form-control';
import {Combobox} from 'baseui/combobox';
import {Button} from 'baseui/button';
import * as React from 'react';

export type OptionT = { label: string; id: string };

interface SearchFormParams {
    value: string;
    onChange: (value) => void;
    mapOptionToString: (option: OptionT) => string;
    onClick: () => void
}

export function SearchForm(props: SearchFormParams) {
    return (
        <form>
            <div>
                <FormControl
                    label="Search Github Repos.."
                    caption="Start typing..."
                >
                    <Combobox
                        value={props.value}
                        onChange={props.onChange}
                        mapOptionToString={props.mapOptionToString}
                        options={[]}
                        name="search"
                        size="compact"
                    />
                </FormControl>
            </div>
            <div>
                <Button
                    onClick={props.onClick}
                    size="compact"
                >
                    Search
                </Button>
            </div>
        </form>
    )
}
