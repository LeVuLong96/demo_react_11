import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

const BoxMenu = styled('div')({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',

    '& > li': {
        padding: "16px 32px",
    },

    '& > li > a': {
        color: "grey",
    },

    '& > li > a.active': {
        color: 'primary',
        textDecoration: "underline",
        fontWeight: "bold",
    },
});


function ProductMenu(props) {
    return (
        <BoxMenu component="ul">
            <li>
                <Link component={NavLink} to=".">Description</Link>
            </li>
            <li>
                <Link component={NavLink} to="additional">Additional Information</Link>
            </li>
            <li>
                <Link component={NavLink} to="reviews">Reviews</Link>
            </li>
        </BoxMenu>
    );
}

export default ProductMenu;