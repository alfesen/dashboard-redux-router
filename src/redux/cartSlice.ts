import { createSlice } from '@reduxjs/toolkit'
import { CartState } from '../types'

const cartSlice = createSlice({
  name: 'cartList',
  initialState: {
    products: [],
  } as CartState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
