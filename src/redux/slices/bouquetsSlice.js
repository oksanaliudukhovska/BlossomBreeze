import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import db from "../../firebase/firebase";

export const fetchBouquets = createAsyncThunk(
    "bouquets/fetchBouquets",
    async () => {
        const querySnapshot = await getDocs(collection(db, "bouquets"));
        return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    }
); 

const bouquetsSlice = createSlice({
    name: 'bouquets',
    initialState: {
        bouquets: [],
        color: [], // from json parameters and map at bouquetspage
        composition: [], // from json parameters and map at bouquetspage
        filteredBouquets: [],
        filters: {
           colors: [], // есть ли совпадение цвета сo строкой color в json
           flowers: [], // есть ли совпадение цветkа сo строкой composition в json
           priceRange: null,
           sortOrderBouquets: '',
        },
        loading: false,
        error: null,
        selectedPacking: null,
        isMobile: false,
    },
    reducers: {
        setIsMobile: (state, action) => {
          state.isMobile = action.payload
        },
          applyFilters: (state) => {
            state.filteredBouquets = state.bouquets
                .filter((item) => {
                    const colorMatch =
                        !state.filters.colors.length || 
                        state.filters.colors.some((selectedColor) => item.color.includes(selectedColor)); 
        
                    const flowerMatch =
                        !state.filters.flowers.length || 
                        state.filters.flowers.some((selectedFlower) => item.composition.includes(selectedFlower)); 
        
                    const priceMatch =
                        state.filters.priceRange ?
                        (() => {
                            const [min, max] = state.filters.priceRange;
                            return item.price >= min && item.price <= max;
                        })() : true;
        
                    return colorMatch && flowerMatch && priceMatch;
                })
                .sort((a, b) => {
                    if (state.filters.sortOrderBouquets === 'lowToHigh') {
                        return a.price - b.price;
                    } else if (state.filters.sortOrderBouquets === 'highToLow') {
                        return b.price - a.price;
                    }
                    return 0;
                });
        },
          setSortOrderBouquets: (state, action) => {
            state.filters.sortOrderBouquets = action.payload || '';
            state.filteredBouquets = [...state.filteredBouquets].sort((a, b) => {
                if(action.payload === 'lowToHigh') {
                    return a.price - b.price;
                } else if(action.payload === 'highToLow') {
                    return b.price - a.price;
                }
                return 0;
            });
        },
          setColorFilter: (state, action) => {
           state.filters.colors = action.payload;
          },
          setFlowerFilter: (state,action) => {
            state.filters.flowers = action.payload;
        },
          setPriceFilterBouquets: (state, action) =>{
            state.filters.priceRange = action.payload
          },
          resetFilters: (state) => {
            state.filters = {colors: [], flowers: [], priceRange:null, sortOrderBouquets: null};
            state.filteredBouquets = [...state.bouquets];
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchBouquets.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchBouquets.fulfilled, (state, action) => {
            state.bouquets = action.payload;
            const allColors = action.payload.flatMap((bouquet) => bouquet.color || []);
            state.color = Array.from(new Set(allColors));

            const allFlowers = action.payload.flatMap((bouquet) => bouquet.composition || []);
            state.composition = Array.from(new Set(allFlowers));

            state.filteredBouquets = action.payload;

            state.loading = false;
        })
        .addCase(fetchBouquets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export const {
    setIsMobile,
    setColorFilter, 
    setFlowerFilter, 
    resetFilters, 
    setSortOrderBouquets, 
    applyFilters, 
    setPriceFilterBouquets
} = bouquetsSlice.actions
export default bouquetsSlice.reducer