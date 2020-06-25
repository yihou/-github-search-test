import * as React from 'react';
import {Layout} from '../components/Layout';
import {styled} from 'baseui';
import {SearchForm} from '../components/SerachForm';
import {useApi} from '../hooks/useApi';
import {SearchParams} from '../../../types/search';
import {Card} from 'baseui/card';

export const Container = styled('div', {
    paddingTop: '20px',
    paddingLeft: '15px',
    paddingRight: '15px',
    width: '80vw',
    maxWidth: '768px',
    marginLeft: 'auto',
    marginRight: 'auto',
});

export const RepoList = styled('div', {
    marginTop: '20px',
});

const Index: React.FC = () =>  {
    const {data: searchResponse, callApi: searchApi} = useApi<SearchParams, any, any>({
        url: '/search',
        method: 'post',
        initialState: {
            data: {
                nodes: [],
                pageInfo: {
                    endCursor: null,
                    hasPreviousPage: false,
                    hasNextPage: false,
                }
            },
        }
    });
    const repositoryList = searchResponse.nodes;

    const [value, setValue] = React.useState<string>('');

    function handleOnChange(value) {
        setValue(value);
    }

    function handleOnSearch() {
        searchApi({
            query: 'covid19',
        });
    }

    return (
        <Layout>
            <Container>
                <SearchForm
                    value={value}
                    onChange={handleOnChange}
                    onSubmit={handleOnSearch}
                />
                <RepoList>
                    {repositoryList.map(repo => (
                        <Card key={repo.id}>
                            {repo.name}
                        </Card>
                    ))}
                </RepoList>
            </Container>
        </Layout>
    );
};

export default Index;
