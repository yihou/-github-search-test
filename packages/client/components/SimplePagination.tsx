import {Pagination} from 'baseui/pagination';
import * as React from 'react';

export type PageAction = 'next' | 'prev';

export function SimplePagination(props: { hasPreviousPage: boolean, hasNextPage: boolean, onPageChange: (action: PageAction) => void }) {
    // handle pagination
    function fakingPageNumber(): number {
        if (!props.hasNextPage && !props.hasPreviousPage) {
            return 0;
        }

        return 3;
    }

    function fakingCurrentPage(): number {
        if (!props.hasPreviousPage && !props.hasNextPage) {
            return null;
        }
        if (props.hasPreviousPage && props.hasNextPage) {
            return 2;
        } else if (!props.hasNextPage) {
            return 3;
        } else if (!props.hasPreviousPage) {
            return 1;
        }
    }

    function handlePageChange(action: PageAction) {
        props.onPageChange(action);
    }

    return (
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
    );
}
