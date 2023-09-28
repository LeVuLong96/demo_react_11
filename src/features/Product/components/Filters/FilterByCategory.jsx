import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import styled from '@emotion/styled';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

const FilterMenu = styled('ul')({
    listStyleType: 'none',
    padding: '16px 0 0 0',
    margin: 0,
});

const FilterMenuContent = styled('li')({
    
    marginTop: '8px',
    transition: 'all .2s',
    textAlign: 'left',

    ":hover": {
        cursor: 'pointer',
        color: 'blue'
    },

});

function FilterByCategory({onChange}) {

    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const list = await categoryApi.getAll();
                setCategoryList(list.data.map(x => ({
                    id: x.id,
                    name: x.name,
                })));
            } catch (err) {
                console.log("Failed to fetch category list", err);
            }
        })();
    }, []);

    const handleCategoryClick = (category) => {
        if (onChange) onChange(category.id);
    };
    return (
        <Box padding={2}>
            <Typography variant="subtitle2">DANH MỤC SẢN PHẢM</Typography>

            <FilterMenu>
                {
                    categoryList
                    &&
                    categoryList.map(category => (
                        <FilterMenuContent
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                        >
                            <Typography variant="body2">{category.name}</Typography>
                        </FilterMenuContent>
                    ))
                }
            </FilterMenu>

        </Box>
    );
}

export default FilterByCategory;