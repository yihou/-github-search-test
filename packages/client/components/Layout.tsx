import {styled} from 'baseui';
import {Navigation} from './Navigation';
import * as React from 'react';

const Wrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '72px',
    minHeight: 'calc(100vh - 72px)',
    backgroundColor: '#f5f5f5',
});

export const Layout = ({children}) => (
    <Wrapper>
        <Navigation/>
        {children}
    </Wrapper>
)
