import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQty: 0,
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
                toast.success(`Added ${action.payload.title} to cart`, {
                    position: "bottom-left",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
}

);

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;