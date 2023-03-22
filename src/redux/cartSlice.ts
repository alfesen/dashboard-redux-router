import { createSlice } from '@reduxjs/toolkit'
import { CartState } from '../types'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
    lowestId: 1,
  } as CartState,
  reducers: {
    getCarts(state, action) {
      state.carts = action.payload
    },
    
    addCartToCarts(state, action) {
      state.carts = [
        ...state.carts,
        { ...action.payload, id: Math.max(...state.carts.map(c => c.id)) + 1 },
      ]
    },
    removeCartFromCarts(state, action) {
      state.carts = state.carts.filter(c => c.id !== action.payload)
      state.lowestId = Math.min(...state.carts.map(c => c.id))
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
