import * as React from 'react';
import {Layout} from '../components/Layout';
import {useApi} from '../hooks/useApi';
import {Container} from '../components/Container';
import {StyledBodyCell, StyledHeadCell, StyledTable} from 'baseui/table-grid';
import {TopSpacer} from '../components/TopSpacer';
import {Pagination} from 'baseui/pagination';


interface ReportSearchItem {
    createdAt: string;
    searchString: string;
    searchResult: string[];
}

interface ReportSearchList {
    docs: ReportSearchItem[];
    limit: number;
    offset: number;
    page: number;
    pages: number;
    total: number;
}

const Report: React.FC = () => {
    const {data: searchList, callApi: fetchList} = useApi<any, ReportSearchList, any>({
        url: '/report/search-list',
        method: 'get',
        fetchOnMount: true,
        initialState: {
            data: {
                docs: [],
                limit: 0,
                offset: 0,
                page: 1,
                pages: 0,
                total: 0,
            },
        },
    });

    return (
        <Layout withoutHeader>
            <Container>
                <TopSpacer/>
                <StyledTable $gridTemplateColumns="max-content auto 200px">
                    <StyledHeadCell $sticky={true}>#</StyledHeadCell>
                    <StyledHeadCell $sticky={true}>Search String</StyledHeadCell>
                    <StyledHeadCell $sticky={true}>Number of results</StyledHeadCell>
                    {searchList.docs.map((item, index) => (
                        <>
                            <StyledBodyCell>{(index + ((searchList.page - 1) * searchList.limit)) + 1}</StyledBodyCell>
                            <StyledBodyCell>{item.searchString}</StyledBodyCell>
                            <StyledBodyCell>{item.searchResult.length}</StyledBodyCell>
                        </>
                    ))}
                </StyledTable>

                <Pagination
                    size="compact"
                    numPages={searchList.pages}
                    currentPage={searchList.page}
                    onPageChange={({ nextPage }) => {
                        fetchList({
                            page: nextPage,
                        });
                    }}
                />
            </Container>
        </Layout>
    );
};

export default Report;
