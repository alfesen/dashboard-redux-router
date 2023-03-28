import { configureStore } from '@reduxjs/toolkit'
import cartListSlice from './cartListSlice'
import addCartSlice from './addCartSlice'
import cartSlice from './cartSlice'

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartList: cartListSlice.reducer,
    addCart: addCartSlice.reducer,
  },
})

export default store
