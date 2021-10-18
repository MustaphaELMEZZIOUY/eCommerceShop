import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/Product'

import useStyles from './style'

// const products_ = [
//     {id: 1, name: "Shoes", description: "Running Shoes.", price: 10, image: "https://assets.ajio.com/medias/sys_master/root/20210403/xX5W/6068a008aeb269a9e335b3ef/-473Wx593H-461778987-white-MODEL.jpg"},
//     {id: 2, name: "Macbook", description: "Apple macbook.", price: 20, image: "https://assets.ajio.com/medias/sys_master/root/20210403/xX5W/6068a008aeb269a9e335b3ef/-473Wx593H-461778987-white-MODEL.jpg"},
// ]

const Products = ({products, handleAdd}) => {
    const classes = useStyles();

    // console.log(products);
    return (
        <main className = {classes.content}>
            <div className = {classes.toolbar}></div>
            <Grid container justify = "center" spacing = {2}>
                {
                    products.map(item => {
                        // const {name, media, description, price} = item;
                        return (
                            <Grid item key = {item.id} xs = {12} sm = {6} md = {4} lg = {3}>
                                <Product {...item} handleAdd = {handleAdd} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </main>
    )
}

export default Products
