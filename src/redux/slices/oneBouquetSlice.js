import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import db from "../../firebase/firebase";

export const fetchBouquetByID = createAsyncThunk(
    'bouquets/fetchBouquetByID',
    async (id) => {
        const docRef = doc(db, 'bouquets', id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          const bouquetData = { id: docSnap.id, ...docSnap.data() };

          if (bouquetData.availablePackingIds && bouquetData.availablePackingIds.length > 0) {
             const packingQuery = query(
              collection(db, "packing"),
              where("__name__", "in", bouquetData.availablePackingIds)
            );
            const packingDocs = await getDocs(packingQuery);
      
            bouquetData.packing = packingDocs.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          } else {
            bouquetData.packing = [];
          }
      
          return bouquetData;
        } else{
            throw new Error('bouquet not found')
        }
    }
)

const oneBouquetSlice = createSlice({
    name: 'oneBouquet',
    initialState: {
        bouquet: null,
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
      builder
      .addCase(fetchBouquetByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBouquetByID.fulfilled, (state, action) => {
        state.bouquet = action.payload;
        state.loading = false;
      })
      .addCase(fetchBouquetByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })
    }
})

export default oneBouquetSlice.reducer
