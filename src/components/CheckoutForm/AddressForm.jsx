import React, {useState, useEffect} from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider } from 'react-hook-form';
import {Link} from 'react-router-dom';
import FormInput from './CustomTextField';

import {commerce} from '../../lib/commerce'

const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries);
        setShippingCountries(idLabelCountry(countries));
        setShippingCountry(Object.keys(countries)[0]);
    }

    const idLabelCountry = (countries) => {
        return Object.entries(countries).map(([id, label]) => ({id, label}));
    }

    const fetchShippinSubdivision = async (countryId) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryId);

        console.log(subdivisions);

        setShippingSubdivisions(idLabelSubdivisions(subdivisions));
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const idLabelSubdivisions = (subdivisions) => {
        return Object.entries(subdivisions).map(([id, label]) => ({id, label}));
    }

    const fetchShippingOptions = async (checkoutId, country, region = null) => {
        console.log(checkoutId, country, region);
        const options = await commerce.checkout.getShippingOptions(checkoutId, {country, region});
        console.log(options);
        setShippingOptions(idLabelOptions(options));
        if(options.length) {
            setShippingOption(options[0].id);
        } else {
            setShippingOption('')
        }
    }

    const idLabelOptions = (options) => {
        return options.map(shippingOptions => ({id: shippingOptions.id, label: `${shippingOptions.description} - ${shippingOptions.price.formatted_with_symbol}`}));
    }
 
    useEffect(() => {
        console.log(checkoutToken);
        fetchShippingCountries(checkoutToken.id);
    }, [])

    useEffect(() => {
        if(shippingCountry) {
            fetchShippinSubdivision(shippingCountry);
        }
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) {
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
        }
    }, [shippingSubdivision])

    const handleSubmit = data => {
        console.log({...data});
        next({...data, shippingCountry, shippingSubdivision, shippingOption})
    }

    return (
        <>
            <Typography vaiant = "h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit = {methods.handleSubmit(handleSubmit)}>
                    <Grid container spacing = {3}>
                        <FormInput name = "firstName" label = "First Name" required/>
                        <FormInput name = "lastName" label = "Last Name" required/>
                        <FormInput name = "address1" label = "Address" required/>
                        <FormInput name = "email" label = "Email" required/>
                        <FormInput name = "city" label = "City" required/>
                        <FormInput name = "zip" label = "ZIP" required/>

                        <Grid item xs = {12} sm = {6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value = {shippingCountry} fullWidth onChange = {(e) => setShippingCountry(e.target.value)}>
                                {
                                    shippingCountries.map(country => (
                                        <MenuItem key = {country.id} value = {country.id}>
                                            {country.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid> 

                        <Grid item xs = {12} sm = {6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value = {shippingSubdivision} fullWidth onChange = {e => setShippingSubdivision(e.target.value)}>
                                {
                                    shippingSubdivisions.map(division => (
                                        <MenuItem key = {division.id} value = {division.id}>
                                            {division.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        
                        <Grid item xs = {12} sm = {6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value = {shippingOption} fullWidth onChange = {e => setShippingOption(e.target.value)}>
                                {
                                    shippingOptions.map(option => {
                                        console.log(option)
                                        return <MenuItem key = {option.id} value = {option.id}>
                                            {option.label}
                                        </MenuItem>

                                    }
                                    )
                                }
                            </Select>
                        </Grid>
                    </Grid>
                    <br />

                    <div style = {{display: "flex", justifyContent: "space-between"}}>
                        <Button component = {Link} to = "/cart" variant = "outlined">Back to Cart</Button>
                        <Button type = "submit" variant = "contained" color = "primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
