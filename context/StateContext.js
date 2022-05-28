import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        if(checkProductInCart) {
            const updateCarItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updateCarItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    // handle increment & decrement
    const incQty = () => {
        setQty(prevQyt => prevQyt + 1);
    }

    const decQty = () => {
        setQty((prevQyt) => {
            if (prevQyt - 1 < 1) return 1;

            return prevQyt -1;
        })
    }

    return (
        <Context.Provider
            value={{
            showCart,
            setShowCart,
            totalPrice,
            cartItems,
            setTotalQuantities,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);