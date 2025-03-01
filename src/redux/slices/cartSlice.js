
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db, { auth } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Добавление в корзину 
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ item, type, additionalOptions = null }, { rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("User is not authorized");
            }

            const cartRef = doc(db, 'carts', user.uid);
            const cartSnapshot = await getDoc(cartRef);

            let updatedItems = [];

            if (cartSnapshot.exists()) {
                const currentCart = cartSnapshot.data();
                updatedItems = currentCart.items || [];

                const existingItemIndex = updatedItems.findIndex(
                    (cartItem) => cartItem.id === item.id && cartItem.type === type
                );

                if (existingItemIndex >= 0) {
                    updatedItems[existingItemIndex].quantity += 1;
                } else {
                    updatedItems.push({
                        id: item.id,
                        type,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                        additionalOptions,
                    });
                }
            } else {
                updatedItems = [
                    {
                        id: item.id,
                        type,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                        additionalOptions,
                    },
                ];
            }

            await setDoc(cartRef, { items: updatedItems });

            return {
                id: item.id,
                type,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1,
                additionalOptions,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Получение корзины из Firestore
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("User is not authorized");
            }

            const cartRef = doc(db, 'carts', user.uid);
            const cartSnapshot = await getDoc(cartRef);

            if (!cartSnapshot.exists()) {
                return { items: [] };
            }
            return cartSnapshot.data();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCartInFirestore = async (userId, items) => {
    const cartRef = doc(db, 'carts', userId);
    await setDoc(cartRef, { items });
};
const initialViewed = JSON.parse(localStorage.getItem('viewed')) || [];
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
        viewed: Array.isArray(initialViewed) ? initialViewed : [],
    },
    reducers: {
        setViewed: (state, action) => {
            const isAlreadyViewed = state.viewed.some(item => item.id === action.payload.id);

            if (!isAlreadyViewed) {
                state.viewed = [action.payload, ...state.viewed].slice(0, 10);
                localStorage.setItem('viewed', JSON.stringify(state.viewed));
            }
        },
            
        incrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        syncCartToFirestore: (state, action) => {
            updateCartInFirestore(action.payload.userId, state.items);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;

                const existingItem = state.items.find(
                    (item) => item.id === action.payload.id && item.type === action.payload.type
                );
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setViewed, incrementQuantity, decrementQuantity, removeItem, syncCartToFirestore } = cartSlice.actions;

export default cartSlice.reducer;
