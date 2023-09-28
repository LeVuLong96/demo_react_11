import { yupResolver } from "@hookform/resolvers/yup";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from "../../../../components/form-controls/PasswordField";
import "./styles.scss";

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

function LoginForm(props) {
    const schema = yup.object({
        identifier: yup.string()
            .required('Please enter your email.')
            .email('Please enter an valid email address.'),
        password: yup.string()
            .required('Please enter your password.'),
    })
    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
    };

    const { isSubmitting } = form.formState


    return (
        <div className="login">


            <Avatar className="login__avatar" >
                <GroupAddIcon />
            </Avatar>

            <Typography className="login__title spaced" component="h3" variant='h5'>
                Đăng nhập
            </Typography>

            <form className="login__form" onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form} className="login__inputField" >
                    <MarkAsUnreadIcon />
                </InputField>
                <PasswordField name="password" label="Password" form={form} />
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                >
                    ADD
                </Button>
                {isSubmitting && <LinearProgress className="addUser__progress" />}
            </form>
        </div>
    );
}

export default LoginForm;