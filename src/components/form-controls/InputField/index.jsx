import { TextField, FormHelperText } from '@mui/material';
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
    const { form, name, label, disabled, children } = props;
    const { control, formState } = form;

    return (
        <>
            <Controller
                name={name}
                control={control}
                margin='normal'
                variant="outlined"
                render={({ field }) => (
                    <>
                        <TextField
                            {...field}
                            fullWidth
                            label={label}
                            disabled={disabled}
                            error={!!formState?.errors[name]}
                            InputProps={{
                                endAdornment: children,
                            }}
                        />
                        {formState?.errors[name] && (
                            <FormHelperText error>
                                {formState?.errors[name]?.message}
                            </FormHelperText>
                        )}
                    </>

                )}
            />
        </>
    );
}

export default InputField;