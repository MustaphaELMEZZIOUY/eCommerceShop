import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';

import useStyles from './styles'

// name, media, description, price
//source, formatted_with_symbol

const Product = ({id, name, description, price, media, handleAdd}) => {
    const classes = useStyles();
    return (
        <Card className = {classes.root}>
            <CardMedia className = {classes.media} image = {media.source} title = {name}/>
            
            <CardContent >
                <div className = {classes.cardContent}>
                    <Typography variant = "h5" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant = "h5">
                        {price.formatted_with_symbol}
                    </Typography>
                </div>

                <Typography variant = "body2" color = "textSecondary" dangerouslySetInnerHTML = {{__html: description}}>
                </Typography>
            </CardContent>

            <CardActions disableSpacing className = {classes.cardActions}>
                <IconButton aria-label = "Add to Cart" className = {classes.cardIcon} onClick = {async () => await handleAdd(id, 1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
