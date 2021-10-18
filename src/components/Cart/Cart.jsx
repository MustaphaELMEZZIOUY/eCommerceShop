import React from 'react';
import {Container, Typography, Button, Grid} from '@material-ui/core';
import CartItem from './CartItem/CartItem'
import useStyles from './style'
import {Link} from 'react-router-dom'

const Cart = ({cart, emptyCart, incDecRemove}) => {
    const classes = useStyles();
    const isEmpty = !cart.total_items;

    console.log(isEmpty);
    const EmptyCart = () => (
        <Typography variant = "subtitle1">You have no items in your shopping cart, <Link to = "/" className = {classes.link}>start adding some</Link>!</Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing = {3}>
                {
                    cart.line_items.map(item => (
                        <Grid item xs = {12} sm = {4} key = {item.id}>
                            <CartItem item = {item} incDecRemove = {incDecRemove}/>
                        </Grid>
                    ))
                }
            </Grid>

            <div className={classes.cardDetails}>
                <Typography variant = "h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>

                <div>
                    <Button className={classes.emptyButton} size = "large" type = "button" variant = "contained" color="secondary" onClick = {emptyCart}>Empty The Cart</Button>
                    <Button component = {Link} to = "/checkout" className={classes.checkoutButton} size = "large" type = "button" variant = "contained" color="primary">Check Out</Button>
                </div>
            </div>
        </>
    )

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant = "h3" gutterBottom>Your Shopping Cart</Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
