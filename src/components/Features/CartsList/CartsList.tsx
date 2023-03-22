import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import CartsListItem from './CartsListItem'
import s from './CartsList.module.scss'
import Fallback from '../../UI/Fallback'

const CartsList = () => {
  const carts = useSelector((state: any) => state.cart.carts)

  const renderCartsListItems = carts.map(
    ({ id, totalProducts, total }: any) => {
      return (
        <CartsListItem
          aria-label='cart-list-item'
          key={`${id}_cart_list_item_key`}
          id={id}
          totalAmount={total}
          totalProducts={totalProducts}
        />
      )
    }
  )

  return (
    <nav className={s.carts}>
      <NavLink className={s.carts__add} to={'/products'}>
        Add Cart
      </NavLink>
      {carts && carts.length > 0 && renderCartsListItems}
      {(!carts || carts.length === 0) && <Fallback message='No carts here' />}
    </nav>
  )
}

export default CartsList
