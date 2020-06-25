import * as React from 'react';
import {Layout} from '../components/Layout';
import {styled} from 'baseui';
import {OptionT, SearchForm} from '../components/SerachForm';

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
            <Container>
                <SearchForm
                    value={value}
                    onChange={handleOnChange}
                    mapOptionToString={mapOptionToString}
                    onClick={handleOnSearch}
                />
            </Container>
        </Layout>
    );
};

export default Index;
