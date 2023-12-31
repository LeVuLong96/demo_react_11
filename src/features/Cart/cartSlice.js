const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        showMiniCart: false,
        cartItems: [],
    },
    reducers: {
        showMiniCart(state, action) {
            state.showMiniCart = true;
        },

        hideMiniCart(state, action) {
            state.showMiniCart = false;
        },

        addToCart(state, action) {
            const newItem = action.payload;
            const index = state.cartItems.findIndex( x => x.id === newItem.id)
            if ( index >= 0) {
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },
        
        setQuantity(state, action) {
            const { id, quantity } = action.payload;

            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },

        removeFormCart(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItems = state.cartItems.filter(x => x.id !== idNeedToRemove );
        },
    }
})

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFormCart } = actions;
export default reducer;