import React from 'react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const FilterService = styled('div')({
  padding: '16px',
  borderTop: '0.5px solid #ccc',
});

const FilterCheckBox = styled('ul')({
    listStyleType: 'none',
    padding: '16px 0 0 0',
    margin: 0,
});

const FilterCheckboxContent = styled('li')({
    
    transition: 'all .2s',

    ":hover": {
        cursor: 'pointer',
        color: 'blue'
    },

});


FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterByService({ onChange, filters = {}}) {
  const handleChange = (event) => {
    if (!onChange) return;
    const { name, checked } = event.target;
    const updatedFilters = { ...filters };
    updatedFilters[name] = checked;
    onChange(updatedFilters);
  };

  const filtersToUse = filters || {};

  return (
    <FilterService>
      <Typography variant='subtitle2'>DỊCH VỤ</Typography>
      <FilterCheckBox>
        {[
          { name: 'isPromotion', label: 'Có khuyến mãi' },
          { name: 'isFreeShip', label: 'Miễn phí vận chuyển' },
        ].map((service) => (
          <FilterCheckboxContent key={service.name}>
            <FormControlLabel
              control={
                <Checkbox
                  name={service.name}
                  checked={!!filtersToUse[service.name]}
                  onChange={handleChange}
                />
              }
              label={service.label}
            />
          </FilterCheckboxContent>
        ))}
      </FilterCheckBox>
    </FilterService>
  );
}

export default FilterByService;
