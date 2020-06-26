import {styled} from 'baseui';
import {Navigation} from './Navigation';
import * as React from 'react';
import {Props} from 'react';

interface LayoutProps extends Props<any> {
    withoutHeader?: boolean;
}

const Wrapper = styled<LayoutProps, any, any>('div', ({withoutHeader}) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: withoutHeader ? 0 : '61px',
    minHeight: withoutHeader ? '100vh' : 'calc(100vh - 61px)',
    backgroundColor: '#f5f5f5',
}));

export const Layout = ({children, withoutHeader = false}: LayoutProps) => (
    <Wrapper withoutHeader={withoutHeader}>
        {!withoutHeader && <Navigation/>}
        {children}
    </Wrapper>
)
