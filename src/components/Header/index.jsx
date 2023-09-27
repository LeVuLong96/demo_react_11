import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Register from '../../features/Auth/components/Register';
import "./styles.scss";
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import Login from 'features/Auth/components/Login';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem } from '@mui/material';
import { logout } from 'features/Auth/userSlice';


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { cartItemsCountSelector } from 'features/Cart/selectors';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const MODE = {
    LOGIN: 'Login',
    REGISTER: 'Register',
};



export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user.current);
    const cartItemsCount = useSelector(cartItemsCountSelector)
    const isLoggedIn = !!loggedInUser?.id;

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null);

    const admin = 'longpra2@gmail.com';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
        setAnchorEl(null);
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleManageClick = () => {
        navigate('/admin');
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='AppBar'>
                <Toolbar>
                    <BabyChangingStationIcon />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                        <Link to='/' className="link">
                            <span className="link__text">GIADỤNGTHÔNGMINH</span>
                        </Link>
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
                        <Badge badgeContent={cartItemsCount} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {/* <NavLink to='/albums' className="nav-link">
                        <Button className="nav-link__button">
                            <span className="link__text">Album</span>
                        </Button>
                    </NavLink> */}

                    {isLoggedIn ? (
                        <IconButton onClick={handleClickMenu}>
                            <AccountCircleIcon sx={{ color: "white" }} />
                        </IconButton>
                    ) : (
                        <Button color="inherit" onClick={handleClickOpen}>Đăng nhập</Button>
                    )}

                </Toolbar>
            </AppBar>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {!admin ? (
                    <MenuItem onClick={handleCloseMenu}>Thông tin cá nhân</MenuItem>
                ) : (
                    <>
                        <MenuItem onClick={handleCloseMenu}>Thông tin cá nhân</MenuItem>
                        <MenuItem onClick={handleManageClick}>Quàn lý cửa hàng</MenuItem>
                    </>

                )}
                <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
            </Menu>

            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                classes={{
                    paper: 'dialog__paper'
                }}
                className="custom-dialog"

            >
                <IconButton className='dialog__closeButton' onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogContent>
                    {mode === MODE.REGISTER ? (
                        <>
                            <Register className="dialog__form" closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                                    Đến đăng nhập
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Login className="dialog__form" closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                                    Đến đăng ký
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>

            </Dialog>
        </Box>
    );
}