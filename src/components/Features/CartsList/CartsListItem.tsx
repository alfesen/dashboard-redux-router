import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import useFetchData from '../../../hooks/useFetchData'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../redux/cartSlice'
import { CartsListItem as PropsType } from '../../../types'
import Button from '../../UI/Button'
import s from './CartsListItem.module.scss'
import RemoveModal from './RemoveModal'

const CartsListItem = ({ id, totalProducts, totalAmount }: PropsType) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartId } = useParams()

  const { sendRequest } = useFetchData()
  const openModal = () => {
    setShowConfirmDelete(true)
  }

  const closeModal = () => {
    setShowConfirmDelete(false)
  }

  const confirmDelete = async () => {
    if (id <= 20) {
      const response = await sendRequest(
        `https://dummyjson.com/carts/${id}`,
        'DELETE'
      )
      if (response.isDeleted) {
        if (+cartId! === id) navigate('/')
        dispatch(cartActions.removeCartFromCarts(id))
      }
    } else {
      if (+cartId! === id) navigate('/')
      dispatch(cartActions.removeCartFromCarts(id))
    }
  }

  return (
    <div className={`${s.cart}`}>
      {showConfirmDelete && (
        <RemoveModal
          id={id}
          totalAmount={totalAmount}
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
      )}
      <NavLink
        to={`/${id}`}
        key={id}
        className={({ isActive }) =>
          isActive ? `${s.cart__link} ${s.active}` : s.cart__link
        }>
        <h4>{id}</h4>
        <div>
          <p>
            Total Products: <strong>{totalProducts}</strong>
          </p>
          <p>
            Total Amount: <strong>{totalAmount}</strong>
          </p>
        </div>
      </NavLink>
      <Button className={s.cart__remove} onClick={openModal}>
        Remove
      </Button>
    </div>
  )
}

export default CartsListItem
