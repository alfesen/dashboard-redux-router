import { Fragment, useState } from 'react'
import { AddCartOverlay as PropTypes } from '../../../types'
import Button from '../../UI/Button'
import Overlay from '../../UI/Overlay'
import AddedProducts from './AddedProducts'
import s from './AddCartModal.module.scss'

const AddCartModal = ({ cartProducts, sendCart, onCancel }: PropTypes) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const sendCartHandler = () => {
    setClicked(true)
    sendCart()
  }

  return (
    <Overlay className={s.cart} onClose={onCancel}>
      {cartProducts.length > 0 ? (
        <Fragment>
          <AddedProducts products={cartProducts} />
          <Button
            disabled={clicked}
            danger
            onClick={sendCartHandler}
            className={s.cart__confirm}>
            Send Cart
          </Button>
        </Fragment>
      ) : (
        <p className={s.cart__error}>No products in this cart</p>
      )}
    </Overlay>
  )
}

export default AddCartModal
