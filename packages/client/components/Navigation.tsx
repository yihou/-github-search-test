import {Layer} from 'baseui/layer';
import React from 'react';
import {styled} from 'baseui';
import {ALIGN, HeaderNavigation, StyledNavigationItem, StyledNavigationList} from 'baseui/header-navigation';
import Link from 'next/link';
import {Button} from 'baseui/button';
import {Container} from './Container';

const NavigationWrapper = styled('div', {
    boxSizing: 'border-box',
    width: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
});


export const Navigation = () => {

    return (
        <Layer>
            <NavigationWrapper>
                <Container>
                    <HeaderNavigation>
                        <StyledNavigationList $align={ALIGN.left}>
                            <StyledNavigationItem>Github Search Test</StyledNavigationItem>
                        </StyledNavigationList>
                        <StyledNavigationList $align={ALIGN.center} />
                        <StyledNavigationList $align={ALIGN.right}>
                            <StyledNavigationItem>
                                <Link href="/login">
                                    <Button size="compact">Login</Button>
                                </Link>
                            </StyledNavigationItem>
                        </StyledNavigationList>
                    </HeaderNavigation>
                </Container>
            </NavigationWrapper>
        </Layer>
    );
};
