import React, { useState } from 'react';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    // Product data with rates
    const [products, setProducts] = useState([
        { name: "product9", rate: 60 },
        { name: "product3", rate: 30 },
        { name: "product1", rate: 24 },
        { name: "product2", rate: 26 },
        { name: "product8", rate: 44 }
    ]);

    // State to track checked items
    const [checkedItems, setCheckedItems] = useState({});

    // Function to handle checkbox change
    const handleCheckboxChange = (productName, isChecked) => {
        setCheckedItems(prevItems => ({
            ...prevItems,
            [productName]: isChecked
        }));
    };

    // Calculate total amount based on checked items
    const calculateTotal = () => {
        let total = 0;
        products.forEach(product => {
            if (checkedItems[product.name]) {
                total += product.rate;
            }
        });
        return total;
    };
    const handleAddToCart = () => {
        const itemsToAdd = Object.entries(checkedItems)
            .filter(([productName, isChecked]) => isChecked)
            .map(([productName]) => {
                const product = products.find(p => p.name === productName);
                return {
                    name: productName,
                    rate: product ? product.rate : 0
                };
            });
        console.log("Adding to cart:", itemsToAdd);
        navigate('/AddToCart', { state: { itemsToAdd } });
    };
    return (
        <div className='mt-5'>
            <div className='container border shadow justify-content-center p-4 mt-3'>
                <div className='h2 p-2'>Items</div>
                {/* Render products */}
                {products.map(product => (
                    <Product
                        key={product.name}
                        productName={product.name}
                        rateItem={product.rate}
                        checkedItem={checkedItems[product.name] || false}
                        onCheckboxChange={handleCheckboxChange}
                    />
                ))}
                {/* Total amount row */}
                <div className='row mt-3 border bg-light d-flex h2' style={{ position: 'sticky', bottom: '0', zIndex: '999' }}>
                    <div className='col-md-9'>Total</div>
                    <div className='col-md-3 d-flex justify-content-end align-items-center'>
                        <div className='me-4'>₹{calculateTotal()}</div>
                        <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className='container justify-content-center p-4 mt-3 h3'>
                {/* Additional content or components */}
            </div>
        </div>
    );
};

export default Home;
