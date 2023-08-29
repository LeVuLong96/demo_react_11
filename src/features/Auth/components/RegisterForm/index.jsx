import { yupResolver } from "@hookform/resolvers/yup";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from "../../../../components/form-controls/PasswordField";
import "./styles.scss";

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

function RegisterForm(props) {
    const schema = yup.object({
        fullName: yup.string()
            .required('Please enter your full name')
            .test('Should has at least two words.', 'Please enter at least two words.', (values) => {
                const words = values.trim().split(/\s+/);
                return words.length > 1;
            }),
        email: yup.string()
            .required('Please enter your email.')
            .email('Please enter an valid email address.'),
        password: yup.string()
            .required('Please enter your password.')
            .min(6, 'Please enter at least 6 characters'),
        retypePassword: yup.string()
            .required('Please enter your password')
            .oneOf([yup.ref('password')], 'Password does not match'),
    })
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
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
        <div className="addUser">
            

            <Avatar className="addUser__avatar" >
                <GroupAddIcon />
            </Avatar>

            <Typography className="addUser__title spaced" component="h3" variant='h5'>
                Tạo tài khoản
            </Typography>

            <form className="addUser__form" onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form} className="addUser__inputField" >
                    <PersonIcon />
                </InputField>
                <InputField name="email" label="Email" form={form} className="addUser__inputField" >
                    <MarkAsUnreadIcon />
                </InputField>
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype Password" form={form} />
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
                {isSubmitting && <LinearProgress className="addUser__progress"/>}
            </form>
        </div>
    );
}

export default RegisterForm;