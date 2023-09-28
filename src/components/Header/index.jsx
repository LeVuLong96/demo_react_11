import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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


const MODE = {
    LOGIN: 'Login',
    REGISTER: 'Register',
};

export default function Header() {
    const dispatch = useDispatch(); 
    const loggedInUser = useSelector(state => state.user.current)
    const isLoggedIn = !!loggedInUser?.id;

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null);

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

                    <NavLink to='/todos' className="nav-link">
                        <Button className="nav-link__button">
                            <span className="link__text">Todo</span>
                        </Button>
                    </NavLink>
                    <NavLink to='/albums' className="nav-link">
                        <Button className="nav-link__button">
                            <span className="link__text">Album</span>
                        </Button>
                    </NavLink>

                    {isLoggedIn ? (
                        <IconButton onClick={handleClickMenu}>
                            <AccountCircleIcon sx={{ color: "white" }} />
                        </IconButton>
                    ) : (
                        <Button color="inherit" onClick={handleClickOpen}>Login</Button>
                    )}

                </Toolbar>
            </AppBar>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
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