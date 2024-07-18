import React, { useState, useEffect, useMemo } from 'react';
const AddToCart = () => {
    console.log()
    const [value, setValue] = useState([]);
    useEffect(() => {
        // Check if "AddToCart" exists in localStorage
        const cartItems = localStorage.getItem("AddToCart");
        if (cartItems) {
            setValue(JSON.parse(cartItems));
        }
    }, []);

    return (
        <div>
            <div className='container border shadow justify-content-center p-4 mt-3'>
            <h2>Items in Cart:</h2>
                {value.map((item, index) => {
                    let tot = 0;
                    return (
                        <div key={index} className='container border shadow justify-content-center p-4 mt-3'>
                            {item.map((item1, index1) => {
                                tot += item1.rate;
                                return (
                                    <div key={index1} className='container justify-content-center p-4 mt-3 h3'>
                                        <div className='row mb-3'>
                                            <div className='col-md-3'>
                                                {item1.name}
                                            </div>
                                            <div className='col-md-4'>
                                                <img src={item1?.image} alt={item1.name} width="100" />
                                            </div>
                                            <div className='col-md-4 d-flex justify-content-end align-items-center'>
                                                <div>{item1.rate}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className='row mt-3 border bg-light d-flex h2'>
                                <div className='col-md-9'>Total</div>
                                <div className='col-md-3 d-flex justify-content-end align-items-center'>
                                    <div className='me-5'>₹{tot}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AddToCart;
