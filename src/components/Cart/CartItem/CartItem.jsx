import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({item, incDecRemove}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image = {item.media.source} alt = {item.name} className = {classes.media} />
            <CardContent className = {classes.cardContent}>
                <Typography variant = "h4">{item.name}</Typography>
                <Typography variant = "h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>

            <CardActions className = {classes.cartActions}>
                <div className = {classes.buttons}>
                    <Button type = "button" size = "small" onClick = {async () => await incDecRemove("dec", item.id, item.quantity)}>-</Button>
                    <Typography style = {{padding: "0 20px"}}>{item.quantity}</Typography>
                    <Button type = "button" size = "small" onClick = {async () => await incDecRemove("inc", item.id, item.quantity)}>+</Button>
                </div>

                <Button variant = "contained" type = "button" color = "secondary" onClick = {async () => await incDecRemove("remove", item.id)}>Remove</Button>
            </CardActions>

        </Card>
    )
}

export default CartItem
