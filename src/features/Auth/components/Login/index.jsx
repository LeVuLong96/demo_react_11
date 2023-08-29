import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';
import { useSnackbar } from 'notistack';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (value) => {     
        const action = login(value);
        const resultAction = await dispatch(action)

        try {
            unwrapResult(resultAction);
            //close dialog
            const {closeDialog} = props;
            if (closeDialog) {
                closeDialog();
            }
        } catch (error) {
            console.log('Failed to Login', error);
            enqueueSnackbar(error.message, {variant: 'error'});
        }

    }

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;