import { configureStore} from '@reduxjs/toolkit'
import bouquetsSlice from './slices/bouquetsSlice'
import oneBouquetSlice from './slices/oneBouquetSlice'
import cartSlice from './slices/cartSlice'
import authSlice from './slices/authSlice'
import plantsSlice from './slices/plantsSlice'
import onePlant from './slices/onePlantSlice'

let store = configureStore({
reducer:{
    bouquets: bouquetsSlice,
    oneBouquet: oneBouquetSlice,
    plants:plantsSlice,
    onePlant: onePlant,
    cart: cartSlice,
    auth: authSlice,
}
})

export default store