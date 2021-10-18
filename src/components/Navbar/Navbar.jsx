import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import {Link, useLocation} from 'react-router-dom';

import logo from '../../assets/logo.png'
import useStyles from './style';

const Navbar = ({totalProducts}) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position = 'fixed' className = {classes.appBar} >
                <Toolbar>
                    <Typography component = {Link} to = "/" variant = 'h6' className = {classes.title}>
                        <img src = {logo} alt = "logo" className = {classes.image} />
                        E-Stor
                    </Typography>

                    <div className="classes grow" />
                    {location.pathname === "/" && (
                        <div className="classes button">
                            <IconButton component = {Link} to = "/cart" aria-label = "Cart Items" color = "inherit">
                                <Badge badgeContent = {totalProducts} color = "secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
