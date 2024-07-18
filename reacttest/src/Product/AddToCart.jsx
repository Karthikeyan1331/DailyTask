import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
const AddToCart = () => {
    const location = useLocation();
    const selectedValues = location?.state?.itemsToAdd || [];
    const [value, setValue] = useState([]);
    useEffect(() => {
        // Check if "AddToCart" exists in localStorage
        const cartItems = localStorage.getItem("AddToCart");
        if (cartItems) {
            setValue(JSON.parse(cartItems));
        }
    }, []);

    // Update value state with selectedValues
    useMemo(() => {
        console.log(value)
        setValue([selectedValues]);
    }, [selectedValues]);

    return (
        <div>
            {/* Render content related to AddToCart component */}
            <h2>Items in Cart:</h2>
            <ul>
                {value[1][0].map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AddToCart;
