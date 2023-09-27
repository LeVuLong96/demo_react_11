import styled from '@emotion/styled';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButton, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const BoxQuatity = styled('div')({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    width: '150px',
});

QuatityFild.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function QuatityFild(props) {
    const { form, name, label, disabled } = props;
    const { control, formState } = form;

    return (
        <>
            <FormControl
                fullWidth
                margin='normal'
                variant="outlined"
                size='small'
            >
                <Typography>{label}</Typography>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <BoxQuatity>
                            <IconButton onClick={() => field.onChange(Number.parseInt(field.value) ? Number.parseInt(field.value) - 1 : 0)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <OutlinedInput
                                id={name}
                                type='number'
                                {...field}
                                disabled={disabled}
                                error={!!formState?.errors[name]}
                            />
                            <IconButton onClick={() => field.onChange(Number.parseInt(field.value) ? Number.parseInt(field.value) + 1 : 1)}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                            {formState?.errors[name] && (
                                <FormHelperText error>
                                    {formState?.errors[name]?.message}
                                </FormHelperText>
                            )}
                        </BoxQuatity>
                    )}
                />

            </FormControl>
        </>
    );
}

export default QuatityFild;