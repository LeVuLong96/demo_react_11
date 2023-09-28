import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled } = props;
    const { control, formState } = form;
    
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <TextField
                            {...field}
                            fullWidth
                            label={label}
                            disabled={disabled}

                            error={!!formState?.errors[name]}
                            // helperText={formState.errors[name] ? "Incorrect entry." : ""}
                            helperText={formState?.errors[name]?.message}

                        />
                    </>

                )}
            />
        </>
    );
}

export default InputField;