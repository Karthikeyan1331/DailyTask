import React, { useState, useEffect } from 'react';

const Product = ({ checkedItem, productName, rateItem, imageItem="https://thumbs.dreamstime.com/b/illustration-basket-food-meals-products-food-products-icon-168597736.jpg", onCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState(checkedItem); // State for checkbox
    const [name, setName] = useState(productName); // State for product name
    const [rate, setRate] = useState(rateItem); // State for product rate
    const [image, setImage] = useState(imageItem); // State for product image

    // Update state when props change
    useEffect(() => {
        setIsChecked(checkedItem);
        setName(productName);
        setRate(rateItem);
        setImage(imageItem);
    }, [checkedItem, productName, rateItem, imageItem]);

    // Handle checkbox change and communicate to parent
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsChecked(isChecked);
        onCheckboxChange(productName, isChecked);
    };

    return (
        <div className='container justify-content-center p-4 mt-3 h3'>
            <div className='row mb-3'>
                <div className='col-md-1'>
                    <input type="checkbox" className='form-check-input' checked={isChecked} onChange={handleCheckboxChange} />
                </div>
                <div className='col-md-3'>
                    {name}
                </div>
                <div className='col-md-4'>
                    <img src={image} alt={name} width="100" />
                </div>
                <div className='col-md-4 d-flex justify-content-end align-items-center'>
                    <div>{rate}</div>
                </div>
            </div>
        </div>
    );
};

export default Product;
