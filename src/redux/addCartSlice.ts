import { createSlice } from '@reduxjs/toolkit'
import { AddCartState } from '../types'

const addCartSlice = createSlice({
  name: 'addCart',
  initialState: {
    products: [],
    cartProducts: [],
    overlay: false,
  } as AddCartState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload
    },
    setCartProducts: (state, action) => {
      const existingProduct = state.cartProducts.find(
        product => product.id === action.payload.id
      )
      if (existingProduct) {
        const newCartProducts = [...state.cartProducts]
        const index = newCartProducts.findIndex(
          product => product.id === action.payload.id
        )
        newCartProducts[index].quantity = newCartProducts[index].quantity! + 1
        state.cartProducts = newCartProducts
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 })
      }
    },
    toggleOverlay: (state, action) => {
      state.overlay = action.payload
    },
  },
})

export const addCartActions = addCartSlice.actions

export default addCartSlice
