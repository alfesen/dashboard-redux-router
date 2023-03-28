import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartListActions } from '../../../redux/cartListSlice'
import useFetchData from '../../../hooks/useFetchData'
import { Cart, Product, State } from '../../../types'
import Button from '../../UI/Button'
import Error from '../../UI/Error'
import Fallback from '../../UI/Fallback'
import Loading from '../../UI/Loading'
import ProductItem from '../shared/ProductItem'
import { countDiscount } from '../../../helpers'
import s from './AddCart.module.scss'
import AddCartOverlay from './AddCartModal'
import { addCartActions } from '../../../redux/addCartSlice'

const AddCart = (): JSX.Element => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const { loading, error, detachError, sendRequest } = useFetchData()
  const navigate = useNavigate()
  const products = useSelector(({ addCart }: State) => addCart.products)
  const cartProducts = useSelector(({ addCart }: State) => addCart.cartProducts)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      const { products } = (await sendRequest(
        'https://dummyjson.com/products'
      )) as Cart
      dispatch(addCartActions.getProducts(products))
    }
    fetchProducts()
  }, [sendRequest, dispatch])

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
    dispatch(cartListActions.addCartToCarts(response))
    navigate('/')
  }

  const renderProducts = products.map((p: Product) => {
    const { id, title, price, discountPercentage, total } = p
    const addProductToCart = () => {
      dispatch(addCartActions.setCartProducts(p))
    }

    return (
      <ProductItem
        key={id}
        id={id}
        title={title}
        price={price}
        discountPercentage={discountPercentage}
        discountedPrice={+countDiscount(price, discountPercentage)}
        total={total}
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
