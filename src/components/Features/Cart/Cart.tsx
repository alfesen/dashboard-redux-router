import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import useFetchData from '../../../hooks/useFetchData'
import ProductItem from '../shared/ProductItem'
import { Cart as CartType, Product, State } from '../../../types'
import Error from '../../UI/Error'
import Loading from '../../UI/Loading'
import Fallback from '../../UI/Fallback'
import LineChart from './LineChart'

import s from './Cart.module.scss'
import { cartActions } from '../../../redux/cartSlice'

const Cart = () => {
  const { sendRequest, error, loading, detachError } = useFetchData()
  const { cartId } = useParams()
  const cart = useSelector(({ cartList }: State) => cartList.currentCart)
  const products = useSelector(({ cart }: State) => cart.products)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchProducts = async () => {
      if (+cartId! <= 20) {
        const { products } = (await sendRequest(
          `https://dummyjson.com/carts/${+cartId!}`
        )) as CartType
        dispatch(cartActions.getProducts(products))
      }
      return
    }
    if (+cartId! > 20) {
      cart && dispatch(cartActions.getProducts(cartId))
      
      return
    }
    fetchProducts()
  }, [sendRequest, cartId, dispatch, cart])

  const renderProducts = products.map((p: Product) => (
    <ProductItem
      aria-label='product-item'
      key={p.id}
      id={p.id}
      title={p.title}
      quantity={p.quantity}
      price={+p.price.toFixed(2)}
      discountPercentage={p.discountPercentage}
      discountedPrice={+p.discountedPrice.toFixed(2)}
      total={+p.discountedPrice.toFixed(2)}
    />
  ))

  return (
    <section className={s.cart}>
      {loading && <Loading dark />}
      {error && <Error onDetach={detachError} message={error} />}
      {!loading && !error && products.length > 0
        ? renderProducts
        : !loading && <Fallback message={'Nothing found'} dark />}

      {!loading && !error && products.length > 0 && (
        <LineChart products={products} />
      )}
    </section>
  )
}

export default Cart
