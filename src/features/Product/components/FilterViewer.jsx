import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';

const FilterView = styled('ul')({
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    margin: '6px 0',
    padding: 0,
    listStyle: 'none',

    '& > li': {
        margin: 0,
        padding: '6px',
    }
});

const FILTER_LIST = [
    {
        id: 1,
        getLabel: (filters) => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => { },
        onToggle: (filters) => {
            const newFilters = { ...filters };
            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }

            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: () => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters.isPromotion
            return newFilters;
        },
        onToggle: () => { },
    },
    {
        id: 3,
        getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) =>
            Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.salePrice_lte;
            delete newFilters.salePrice_gte;
            return newFilters;
        },
        onToggle: () => { },
    },
    // {
    //     id: 4,
    //     getLabel: (filters) => 'Danh mục',
    //     isActive: () => true,
    //     isVisible: (filters) => true,
    //     isRemovable: true,
    //     onRemove: (filters) => {},
    //     onToggle: (filters) => {},
    // },
];

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {

    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters));
    }, [filters])

    return (
        <FilterView>
            {visibleFilters.map(x => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={x.isRemovable ? null : () => {
                            if (!onChange) return;
                            const newFilters = x.onToggle(filters)
                            onChange(newFilters)
                        }}

                        onDelete={x.isRemovable ? () => {
                            if (!onChange) return;
                            const newFilters = x.onRemove(filters)
                            onChange(newFilters)
                        } : null}
                    />

                </li>
            ))}

        </FilterView>
    );
}

export default FilterViewer;