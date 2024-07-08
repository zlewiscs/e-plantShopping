import { createSlice } from '@reduxjs/toolkit';

const CreatSlice = createSlice({
    name: 'cart',
    initialState : { items: [] },
    reducers: {
        // If an item is already in the cart, increase the count
        // If not add the item to the cart and set its count to 1
        addItem: (state, action) => {
            const { id, name, image, cost } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ id, name, image, cost, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },

        // Destructure the payload before finding the item to update, use diff which can be + or -
        // to indicate + or -
        updateQuantity: (state, action) => {
            const { plant, diff } = action.payload;
            let itemToUpdate = state.items.find((item) => item.id === plant.id);
            if (itemToUpdate && itemToUpdate.quantity + diff > 0) {
                itemToUpdate.quantity += diff;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CreatSlice.actions;

export default CreatSlice.reducer;
