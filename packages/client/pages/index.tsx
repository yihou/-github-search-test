import * as React from 'react';
import {Layout} from '../components/Layout';
import {styled} from 'baseui';
import {SearchForm} from '../components/SerachForm';
import {useApi} from '../hooks/useApi';
import {SearchParams} from '../../../types/search';
import {Card} from 'baseui/card';
import {Cell, Grid} from 'baseui/layout-grid';
import {OnChangeParams, Value} from 'baseui/select';
import {useState} from 'react';
import {Checkbox} from 'baseui/checkbox';
import {LanguageSelect} from '../components/LanguageSelect';
import {Container} from '../components/Container';

export const RepoList = styled('div', {
    marginTop: '20px',
    marginBottom: '20px',
});

const Index: React.FC = () =>  {
    const [searchParams, setSearchParams] = useState<SearchParams>({query: ''});
    const [selectedLanguage, setSelectedLanguage] = useState<Value>();

    const {data: searchResponse, debouncedCallApi: searchApi} = useApi<SearchParams, any, any>({
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

    function startSearch(updatedParams: SearchParams) {
        const newSearchParams = {
            ...searchParams,
            ...updatedParams,
        };
        setSearchParams(newSearchParams);
        searchApi(newSearchParams);
    }


    function handleOnSearch(value: string) {
        startSearch({query: value});
    }

    function handleOnSelect(param: OnChangeParams) {
        console.log(param.value);
        setSelectedLanguage(param.value);
    }

    return (
        <Layout>
            <Container>
                <Grid>
                    <Cell span={[1, 2, 3]}>
                        <div>
                            <h3 style={{marginTop: 8}}>Search by: </h3>
                            <label style={{display: 'flex'}}>
                                <Checkbox/>
                                <span>Topic</span>
                            </label>
                        </div>
                        <div style={{display: 'flex'}}>
                            <Checkbox/>
                            <div style={{width: '100%'}}>
                                <LanguageSelect
                                    value={selectedLanguage}
                                    onSelect={handleOnSelect}
                                />
                            </div>
                        </div>
                    </Cell>
                    <Cell span={[3, 6, 9]}>
                        <SearchForm onSearch={handleOnSearch} />
                        <RepoList>
                            {repositoryList.map(repo => (
                                <div key={repo.id} style={{marginBottom: '10px'}}>
                                    <Card>
                                        {repo.name}
                                    </Card>
                                </div>
                            ))}
                        </RepoList>
                    </Cell>
                </Grid>

            </Container>
        </Layout>
    );
};

export default Index;
