import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

ProductSort.propTypes = {
    currenSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({currenSort, onChange}) {
    const handleSortChange = (event, newValue) => {
        if (onChange) onChange(newValue);
    };

    return (
        <Tabs 
        value={currenSort} 
        indicatorColor='primary' 
        onChange={handleSortChange} 
        aria-label="disabled tabs example"
        textColor='primary'
        >
            <Tab label="Giá thấp tới cao" value="salePrice:ASC" />
            <Tab label="Giá cao tới thấp" value="salePrice:DESC" />
        </Tabs>
    );
}

export default ProductSort;