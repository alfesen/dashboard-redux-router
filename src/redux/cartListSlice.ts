import { createSlice } from '@reduxjs/toolkit'
import { CartListState } from '../types'

const cartListSlice = createSlice({
  name: 'cartList',
  initialState: {
    carts: [],
    currentCart: [],
    lowestId: 1,
  } as CartListState,
  reducers: {
    getCarts(state, action) {
      state.carts = action.payload
    },

    getSingleCart(state, action) {
      const cart = state.carts.find(c => c.id === action.payload)
      state.currentCart = cart!.products
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

export const cartListActions = cartListSlice.actions

export default cartListSlice
