import * as React from 'react';
import {Layout} from '../components/Layout';
import {useApi} from '../hooks/useApi';
import {Container} from '../components/Container';
import {StyledBodyCell, StyledHeadCell, StyledTable} from 'baseui/table-grid';
import {TopSpacer} from '../components/TopSpacer';

const Report: React.FC = () => {
    const {data: searchList} = useApi<any, any, any>({
        url: '/report/search-list',
        method: 'get',
        fetchOnMount: true,
        initialState: {
            data: [],
        },
    });

    return (
        <Layout withoutHeader>
            <Container>
                <TopSpacer/>
                <StyledTable $gridTemplateColumns="max-content auto 200px">
                    <StyledHeadCell $sticky={true}>#</StyledHeadCell>
                    <StyledHeadCell $sticky={true}>Name</StyledHeadCell>
                    <StyledHeadCell $sticky={true}>Author</StyledHeadCell>
                    {searchList.map((item, index) => (
                        <>
                            <StyledBodyCell>{index}</StyledBodyCell>
                            <StyledBodyCell>{item.name}</StyledBodyCell>
                            <StyledBodyCell>author</StyledBodyCell>
                        </>
                    ))}
                </StyledTable>
            </Container>
        </Layout>
    );
};

export default Report;
