import React, {useState, useEffect} from 'react'
import {commerce} from './lib/commerce'
// import Products from './components/Products/Products';
// import Navbar from './components/Navbar/Navbar'
import {Products, Navbar, Cart, Checkout} from './components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProduct(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const addProductToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    const emptyCart = async () => {
        await commerce.cart.empty();
        setCart([]);
    }

    const incDecRemove = async (type, productId, quantity = 1) => {
        const decOrInc = type === "inc" ? 1 : type === "dec" ? - 1 : 0;
        if(decOrInc) {
            const {cart} = await commerce.cart.update(productId, {quantity: quantity + decOrInc});
            setCart(cart)
        } else if(type === "remove") {
            const {cart} = await commerce.cart.remove(productId);
            setCart(cart)
        }
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            console.log('i am here in handleCaptureCheckout');
            setOrder(incomingOrder);
            console.log('i am here in handleCaptureCheckout', 1);
            refreshCart();
            console.log('i am here in handleCaptureCheckout', 2);
        } catch (error) {
            console.log(error);
            setErrorMessage(error.data.error.message);
        }
    }
 
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    // console.log(cart);

    return (
        <Router>
            <div>
            <Navbar totalProducts = {cart.total_items} />
            <Switch>
                <Route exact path = "/">
                    <Products products =  {products} handleAdd = {addProductToCart}/>
                </Route>

                <Route exact path = "/cart">
                    <Cart cart = {cart} 
                        emptyCart = {emptyCart}
                        incDecRemove = {incDecRemove} />
                </Route>

                <Route exact path = "/checkout">
                    <Checkout 
                    cart = {cart} 
                    order = {order} 
                    onCaptureCheckout = {handleCaptureCheckout} 
                    error = {errorMessage}
                    />
                </Route>
            </Switch>
        </div>
        </Router>
    )
}

export default App
