import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../../firebase/firebase";

export const fetchPlants = createAsyncThunk(
    'plants/fetchPlants',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'plants'));
        return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    }
)

const plantsSlice = createSlice({
    name: 'plants',
    initialState:{
        plants: [],
        filteredPlants: [],
        filters: {
            category: null,
            priceRange: null,
            sortOrder: null,
        },
        loading: false, 
        error: null,
        isMobile: false
    },
    reducers: {
        setIsMobile: (state, action) => {
         state.isMobile = action.payload;       
        }, 
        applyFiters: (state) => {
            state.filteredPlants = state.plants
            .filter((plant) => {
                const categoryMatch = state.filters.category
                ? plant.category === state.filters.category
                : true;
                const priceMatch = state.filters.priceRange
                ? (() => {
                    const [min, max] = state.filters.priceRange;
                    return plant.price >= min && plant.price <= max;
                }) ()
                : true;
                return categoryMatch && priceMatch;
            })
            .sort((a, b) => {
                if (state.filters.sortOrder === 'lowToHigh') {
                    return a.price - b.price;
                } else if (state.filters.sortOrder === 'highToLow') {
                    return b.price - a.price;
                }
                return 0;
            });
        },
        setSortOrder: (state, action) => {
            state.filters.sortOrder = action.payload;
            state.filteredPlants = [...state.filteredPlants].sort((a, b) => {
                if (action.payload === 'lowToHigh') {
                    return a.price - b.price;
                } else if (action.payload === 'highToLow') {
                    return b.price - a.price;
                }
                return 0;
            });
        },
          setCategoryFilter: (state, action) => {
          state.filters.category = action.payload;
        },
        setPriceFilter: (state, action) => {
            state.filters.priceRange = action.payload;
        },
        resetFiters: (state) => {
            state.filters = {category: null, priceRange: null, sortOrder: null};
            state.filteredPlants = [...state.plants];
        },
    },
    extraReducers: (builder) => {
     builder
     .addCase(fetchPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
     })
     .addCase(fetchPlants.fulfilled, (state, action) => {
        state.plants = action.payload;
        state.filteredPlants = action.payload;
        state.loading = false;
     })
     .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
     });
    }
})
export const {setIsMobile, setCategoryFilter, setPriceFilter, resetFiters, applyFiters,  setSortOrder} = plantsSlice.actions;
export default plantsSlice.reducer