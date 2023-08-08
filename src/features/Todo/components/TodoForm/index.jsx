import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-controls/InputFiled';



TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

function TodoForm(props) {
    const schema = yup.object({
        title: yup.string().required('Please enter a title'),
        // validation cho title là 1 giá trị string. nếu lỗi thì show
    })

    const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema),
    });


    const handleSubmit = (values) => {
        console.log('TODO FORM: ', values);
        const {onSubmit} = props;
        if (onSubmit) onSubmit(values);
    };

    


    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Todo" form={form} />
        </form>
    );
}

export default TodoForm;