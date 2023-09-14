import { Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from '@emotion/styled';

const FilterPrice = styled('div')({
    padding: '16px',
    borderTop: '0.5px solid #ccc',
});

const TextFieldPrice = styled('div')({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    marginTop: '8px',
    marginBottom: '8px',

    '& > span': {
        marginTop: '8px',
        marginRight: '8px',
    }

});

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!isNaN(value)) {
            setValues({ ...values, [name]: value });
        }
    };

    const handleSubmit = () => {
        if (onChange) onChange(values);
    };

    return (
        <FilterPrice>
            <Typography variant='subtitle2'>CHỌN KHOẢNG GIÁ</Typography>

            <TextFieldPrice>
                <TextField name='salePrice_gte' value={values.salePrice_gte} onChange={handleChange} size='small' label="Từ" variant="standard"/>
                <span>-</span>
                <TextField name='salePrice_lte' value={values.salePrice_lte} onChange={handleChange} size='small' label="đến" variant="standard" />
            </TextFieldPrice>

            <Button variant='outlined' color='primary' onClick={handleSubmit} size='small'> Áp dụng</Button>
        </FilterPrice>
    );
}

export default FilterByPrice;