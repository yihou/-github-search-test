import * as React from 'react';
import { Button } from 'baseui/button';
import {Layout} from '../components/Layout';
import {Centered} from '../components/Centered';
import {FormControl} from 'baseui/form-control';
import {Combobox} from 'baseui/combobox';
import {styled} from 'baseui';

type OptionT = {label: string; id: string};

export const Container = styled('div', {
    paddingTop: '20px',
    width: '80vw',
});

const Index: React.FC = () =>  {
    const [value, setValue] = React.useState<string>('');

    function mapOptionToString(option: OptionT): string {
        return option.label;
    }

    function handleOnChange(value) {
        setValue(value);
    }

    function handleOnSearch() {

    }

    return (
        <Layout>
            <Centered>
                <Container>
                    <form>
                        <div>
                            <FormControl
                                label="Search Github Repos.."
                                caption="Start typing..."
                            >
                                <Combobox
                                    value={value}
                                    onChange={handleOnChange}
                                    mapOptionToString={mapOptionToString}
                                    options={[]}
                                    name="search"
                                    size="compact"
                                />
                            </FormControl>
                        </div>
                        <div>
                            <Button
                                onClick={handleOnSearch}
                                size="compact"
                            >
                                Search
                            </Button>
                        </div>
                    </form>
                </Container>
            </Centered>
        </Layout>
    );
};

export default Index;
