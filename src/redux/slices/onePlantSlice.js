import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc} from "firebase/firestore";
import db from "../../firebase/firebase";


export const fetchPlantById = createAsyncThunk(
    'plants/fetchPlantByID',
    async (id) => {
        const docRef = doc(db, 'plants', id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            return {id: docSnap.id, ...docSnap.data()}
        } else{
            throw new Error("Plant not fount");
            
        }
    }
)

const onePlant = createSlice({
    name: 'onePlant',
    initialState:{
        plant: null,
        loading: false, 
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
     builder
     .addCase(fetchPlantById.pending, (state) => {
        state.loading = true;
        state.error = null;
     })
     .addCase(fetchPlantById.fulfilled, (state, action) => {
        state.plant = action.payload;
        state.loading = false;
     })
     .addCase(fetchPlantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
     })
    }
})

export default onePlant.reducer