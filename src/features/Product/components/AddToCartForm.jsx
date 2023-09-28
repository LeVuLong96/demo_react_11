import React from 'react';
import PropTypes from 'prop-types';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from '@mui/material';
import QuatityFild from 'components/form-controls/QuatityField';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
    const schema = yup.object({
        quantity: yup.number()
            .required('Hãy nhập số lượng bạn muốn mua.')
            .min(1, 'Ít nhất là 1.').typeError('Hãy nhập số'),
    })
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values);
        }
    };
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuatityFild name="quantity" label="Số Lượng" form={form} />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
            >
                Chọn mua
            </Button>
        </form>
    );
}

export default AddToCartForm;