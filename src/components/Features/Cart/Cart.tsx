import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import useFetchData from '../../../hooks/useFetchData'
import ProductItem from '../shared/ProductItem'
import { Cart as CartType, Product } from '../../../types'
import Error from '../../UI/Error'
import Loading from '../../UI/Loading'
import Fallback from '../../UI/Fallback'
import LineChart from './LineChart'

import s from './Cart.module.scss'

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { sendRequest, error, loading, detachError } = useFetchData()
  const { cartId } = useParams()
  const carts = useSelector((state: any) => state.cart.carts)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchProducts = async () => {
      if (+cartId! <= 20) {
        const cart = await sendRequest(
          `https://dummyjson.com/carts/${+cartId!}`
        )

        setProducts(cart.products)
      }
      return
    }
    if (+cartId! > 20) {
      const cart = carts.find((c: CartType) => c.id === +cartId!)

      cart && setProducts(cart!.products)
      return
    }
    fetchProducts()
  }, [sendRequest, cartId, dispatch, carts])

  const renderProducts = products.map((p: Product) => (
    <ProductItem
      aria-label='product-item'
      key={p.id}
      id={p.id}
      title={p.title}
      quantity={p.quantity}
      price={p.price}
      discountPercentage={p.discountPercentage}
      discountedPrice={p.discountedPrice}
      total={p.discountedPrice}
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
