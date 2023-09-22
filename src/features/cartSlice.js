import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQty: localStorage.getItem("cartTotalQty") ? JSON.parse(localStorage.getItem("cartTotalQty")) : 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {

            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].qty += action.payload.qty;
                toast.info(`Increased ${action.payload.title} cart quantity`, {
                    position: "bottom-left",
                });
            } else {
                state.cartItems.push(action.payload);
                state.cartTotalQty += 1;
                toast.success(`Added ${action.payload.title} to cart`, {
                    position: "bottom-left",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalQty", JSON.stringify(state.cartTotalQty));
        },

        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            );

            state.cartItems = nextCartItems;
            state.cartTotalQty -= 1;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalQty", JSON.stringify(state.cartTotalQty));

            toast.error(`${action.payload.title} was removed from cart`, {
                position: "bottom-left",
            });
        },

        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )

            if (state.cartItems[itemIndex].qty > 1) {
                state.cartItems[itemIndex].qty -= 1;

                toast.info(`Decreased ${action.payload.title} quantity from cart`, {
                    position: "bottom-left",
                });

                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            } else if (state.cartItems[itemIndex].qty === 1) {
                const nextCartItems = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                );

                state.cartItems = nextCartItems;
                state.cartTotalQty -= 1;

                toast.error(`${action.payload.title} was removed from cart`, {
                    position: "bottom-left",
                });

                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                localStorage.setItem("cartTotalQty", JSON.stringify(state.cartTotalQty));
            }

        },

        increaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            );
            state.cartItems[itemIndex].qty += 1;

            toast.info(`Increased ${action.payload.title} quantity in cart`, {
                position: "bottom-left",
            });

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        clearCart(state) {
            state.cartItems = [];
            state.cartTotalQty = 0;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalQty", JSON.stringify(state.cartTotalQty));

            toast.info(`Cart cleared`, {
                position: "bottom-left",
            });
        },

        getTotal(state) {
            let {total} = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, qty } = cartItem;
                    const itemTotal = price * qty;

                    cartTotal.total += itemTotal;
                    return cartTotal;
                },
                {
                    total: 0
                }
            );

            state.cartTotalAmount = total;
        },
    },
}

);

export const { addToCart, removeFromCart, decreaseCart, increaseCart, clearCart, getTotal } = cartSlice.actions;

export default cartSlice.reducer;