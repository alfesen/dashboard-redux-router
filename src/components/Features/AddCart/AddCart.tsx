import { Fragment, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../redux/cartSlice'
import useFetchData from '../../../hooks/useFetchData'
import { Product } from '../../../types'
import Button from '../../UI/Button'
import Error from '../../UI/Error'
import Fallback from '../../UI/Fallback'
import Loading from '../../UI/Loading'
import ProductItem from '../shared/ProductItem'
import { countDiscount } from '../../../helpers'
import s from './AddCart.module.scss'
import AddCartOverlay from './AddCartModal'

const AddCart = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [cartProducts, setCartProducts] = useState<Product[]>([])
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const { loading, error, detachError, sendRequest } = useFetchData()
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchProducts = async () => {
      const { products } = await sendRequest('https://dummyjson.com/products')
      setProducts(products)
    }
    fetchProducts()
  }, [sendRequest])

  const dispatch = useDispatch()

  const sendCart = async () => {
    if (cartProducts.length === 0) {
      return alert('No products to send!')
    }
    const newCart = {
      userId: Math.floor(Math.random() * 100),
      products: cartProducts,
    }
    const response = await sendRequest(
      'https://dummyjson.com/carts/add',
      'POST',
      JSON.stringify(newCart),
      { 'Content-Type': 'application/json' }
    )
    dispatch(cartActions.addCartToCarts(response))
    navigate('/')
  }

  const renderProducts = products.map((p: Product) => {
    const addProductToCart = () => {
      const existingProduct = cartProducts.find(product => product.id === p.id)
      if (existingProduct) {
        const newCartProducts = [...cartProducts]
        const index = newCartProducts.findIndex(product => product.id === p.id)
        newCartProducts[index].quantity = newCartProducts[index].quantity! + 1
        setCartProducts(newCartProducts)
        return
      }
      setCartProducts(prevProd => [...prevProd, { ...p, quantity: 1 }])
    }

    return (
      <ProductItem
        key={p.id}
        id={p.id}
        title={p.title}
        price={p.price}
        discountPercentage={p.discountPercentage}
        discountedPrice={+countDiscount(p.price, p.discountPercentage)}
        total={p.total}
        add
        onAdd={addProductToCart}
      />
    )
  })
  return (
    <Fragment>
      <section className={s.add__products}>
        {loading && <Loading dark />}
        {error && <Error message={error} onDetach={detachError} />}
        {showOverlay && (
          <AddCartOverlay
            onCancel={() => setShowOverlay(false)}
            sendCart={sendCart}
            cartProducts={cartProducts}
          />
        )}
        {!loading && !error && products.length > 0
          ? renderProducts
          : !loading && <Fallback message={'No products in this cart'} dark />}
      </section>
      <div className={s.actions}>
        <Button
          danger
          className={s.actions__show}
          onClick={() => {
            setShowOverlay(true)
          }}>
          Show Cart
        </Button>
        <Button danger className={s.actions__cancel} to={'/1'}>
          Cancel adding cart
        </Button>
        {error && (
          <Button danger className={s.actions__cancel} to={'/1'}>
            Return to carts
          </Button>
        )}
      </div>
    </Fragment>
  )
}

export default AddCart
