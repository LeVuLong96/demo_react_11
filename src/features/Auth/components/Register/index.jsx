import React from 'react';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (value) => {
        // auto set username = email
        value.username = value.email;
        const action = register(value);
        const resultAction = await dispatch(action)

        try {
            unwrapResult(resultAction);
            //close dialog
            const {closeDialog} = props;
            if (closeDialog) {
                closeDialog();
            }
            enqueueSnackbar('Đăng ký thàng công!', {variant: 'success'})
        } catch (error) {
            console.log('Failed to register', error);
            enqueueSnackbar(error.message, {variant: 'error'});
        }

    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;