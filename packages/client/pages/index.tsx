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
import {TopSpacer} from '../components/TopSpacer';
import {Pagination} from 'baseui/pagination';

interface Node {
    id: string;
    name: string;
}

interface PageInfo {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface SearchApiResponse {
    repositoryCount: number;
    nodes: Node[];
    pageInfo: PageInfo;
}

export const RepoList = styled('div', {
    marginTop: '20px',
    marginBottom: '20px',
});

const Index: React.FC = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({query: ''});
    const [selectedLanguage, setSelectedLanguage] = useState<Value>();

    const {
        data: searchResponse,
        debouncedCallApi: debouncedSearchApi,
        callApi: searchApi,
        payload,
    } = useApi<SearchParams, SearchApiResponse, any>({
        url: '/search',
        method: 'post',
        initialState: {
            data: {
                repositoryCount: 0,
                nodes: [],
                pageInfo: {
                    startCursor: null,
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
        debouncedSearchApi(newSearchParams);
    }


    function handleOnSearch(value: string) {
        startSearch({query: value});
    }

    function handleOnSelect(param: OnChangeParams) {
        setSelectedLanguage(param.value);
    }

    // handle pagination
    function fakingPageNumber(): number {
        if (!searchResponse.pageInfo.hasNextPage && !searchResponse.pageInfo.hasPreviousPage) {
            return 0;
        }

        return 3;
    }

    function fakingCurrentPage(): number {
        if (!searchResponse.pageInfo.hasPreviousPage && !searchResponse.pageInfo.hasNextPage) {
            return null;
        }
        if (searchResponse.pageInfo.hasPreviousPage && searchResponse.pageInfo.hasNextPage) {
            return 2;
        } else if (!searchResponse.pageInfo.hasNextPage) {
            return 3;
        } else if (!searchResponse.pageInfo.hasPreviousPage) {
            return 1;
        }
    }

    type PageAction = 'next' | 'prev';

    function handlePageChange(action: PageAction) {
        console.log(action);
        if (action === 'prev') {
            searchApi({
                ...payload,
                before: searchResponse.pageInfo.startCursor,
                after: null,
            });
        } else if (action === 'next') {
            searchApi({
                ...payload,
                before: null,
                after: searchResponse.pageInfo.endCursor,
            });
        }
    }

    return (
        <Layout>
            <TopSpacer/>
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
                        <SearchForm onSearch={handleOnSearch}/>

                        <Pagination
                            size="compact"
                            overrides={{
                                MaxLabel: {
                                    style: () => ({
                                        display: 'none',
                                    }),
                                },
                                DropdownContainer: {
                                    style: () => ({
                                        display: 'none',
                                    }),
                                },
                            }}
                            numPages={fakingPageNumber()}
                            currentPage={fakingCurrentPage()}
                            onPrevClick={() => handlePageChange('prev')}
                            onNextClick={() => handlePageChange('next')}
                        />

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
