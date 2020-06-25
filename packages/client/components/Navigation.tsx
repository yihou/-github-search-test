import {Layer} from 'baseui/layer';
import {MainNavItemT, Unstable_AppNavBar as AppNavBar, UserNavItemT} from 'baseui/app-nav-bar';
import {Overflow as UserIcon} from 'baseui/icon';
import React from 'react';
import {styled} from 'baseui';

const NavigationWrapper = styled('div', {
    boxSizing: 'border-box',
    width: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
});


function renderItem(item: any) {
    return item.label;
}

const USER_NAV = [
    {
        icon: UserIcon,
        item: {label: 'Login'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
    },
];

export const Navigation = () => {
    const [activeNavItem, setActiveNavItem] = React.useState<MainNavItemT | UserNavItemT>();

    return (
        <Layer>
            <NavigationWrapper>
                <AppNavBar
                    appDisplayName="Gitlab Search Test"
                    isNavItemActive={({item}) => item === activeNavItem}
                    onNavItemSelect={({item}) => {
                        if (item !== activeNavItem) {
                            setActiveNavItem(item);
                        }
                    }}
                    mainNav={[]}
                    userNav={USER_NAV}
                />
            </NavigationWrapper>
        </Layer>
    );
};
