import * as React from 'react';
import {useState} from 'react';
import {Layout} from '../components/Layout';
import {darkThemePrimitives, styled} from 'baseui';
import {SearchForm} from '../components/SerachForm';
import {useApi} from '../hooks/useApi';
import {SearchParams, SearchResultGraphQLItem} from '../../../types/search';
import {Card, StyledBody} from 'baseui/card';
import {Container} from '../components/Container';
import {TopSpacer} from '../components/TopSpacer';
import {PageAction, SimplePagination} from '../components/SimplePagination';
import {Cell, Grid} from 'baseui/layout-grid';
import {Button} from 'baseui/button';
import {Avatar} from 'baseui/avatar';
import {FlexGrid} from 'baseui/flex-grid';
import {Paragraph3} from 'baseui/typography';
import {Tag} from 'baseui/tag';
import starIcon from '../static/star.png';
import forkIcon from '../static/fork.png';

interface PageInfo {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface SearchApiResponse {
    repositoryCount: number;
    nodes: SearchResultGraphQLItem[];
    pageInfo: PageInfo;
}

export const RepoList = styled('div', {
    marginTop: '20px',
    marginBottom: '20px',
});
export const TagText = styled('span', {
    marginLeft: '5px',
    lineHeight: '16px',
    display: 'inline-block',
});


const Index: React.FC = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({query: ''});

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

    function handleOnSearch(value: SearchParams) {
        startSearch(value);
    }

    function handlePageChange(action: PageAction) {
        if (action === 'prev') {
            searchApi({
                ...payload,
                before: searchResponse.pageInfo.startCursor,
                after: null,
            });
        } else if (action === 'next') {
            searchApi({
                ...payload,
                before: searchResponse.pageInfo.startCursor,
                after: searchResponse.pageInfo.endCursor,
            });
        }
    }

    return (
        <Layout>
            <TopSpacer/>
            <Container>
                <SearchForm onSearch={handleOnSearch} totalSearchResult={searchResponse.repositoryCount}/>

                <SimplePagination
                    hasNextPage={searchResponse.pageInfo.hasNextPage}
                    hasPreviousPage={searchResponse.pageInfo.hasPreviousPage}
                    onPageChange={handlePageChange}
                />

                <RepoList>
                    <Grid gridMargins={0} gridGaps={15} gridGutters={15}>
                        {repositoryList.map(repo => (
                            <Cell key={repo.id} span={[2, 4, 4]}>
                                <Card
                                    overrides={{
                                        Root: {
                                            style: () => ({
                                                height: '100%',
                                            }),
                                        }
                                    }}
                                    title={(
                                        <FlexGrid
                                            alignItems="center"
                                            overrides={{
                                                Block: {
                                                    style: () => ({
                                                        flexWrap: 'nowrap',
                                                    }),
                                                }
                                            }}>
                                            <a
                                                href={repo.owner.url}
                                                target="_blank"
                                                style={{
                                                    marginRight: '5px',
                                                }}
                                            >
                                                <Avatar
                                                    name={repo.owner.login}
                                                    size="scale1000"
                                                    src={repo.owner.avatarUrl}
                                                />
                                            </a>
                                            <a
                                                href={repo.url}
                                                target="_blank"
                                            >
                                                <Button
                                                    kind="minimal"
                                                    overrides={{
                                                        BaseButton: {
                                                            style: () => ({
                                                                textAlign: 'left',
                                                            })
                                                        }
                                                    }}
                                                >
                                                    {repo.nameWithOwner}
                                                </Button>
                                            </a>
                                        </FlexGrid>
                                    )}
                                >
                                    <StyledBody>
                                        <FlexGrid>
                                            <Tag closeable={false}>
                                                <img
                                                    src={starIcon} alt="Github Star Icon"
                                                    width="12px"
                                                />
                                                <TagText>
                                                    {repo.stargazers.totalCount}
                                                </TagText>
                                            </Tag>
                                            <Tag closeable={false}>
                                                <img
                                                    src={forkIcon} alt="Github Fork Icon"
                                                    width="12px"
                                                />
                                                <TagText>
                                                    {repo.forks.totalCount}
                                                </TagText>
                                            </Tag>
                                        </FlexGrid>
                                        <Paragraph3 color={darkThemePrimitives.mono200}>
                                            {repo.description}
                                        </Paragraph3>
                                    </StyledBody>
                                </Card>
                            </Cell>
                        ))}
                    </Grid>
                </RepoList>
            </Container>
        </Layout>
    );
};

export default Index;
