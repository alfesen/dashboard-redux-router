import { Product } from '../../../types'
import { countDiscount } from '../../../helpers'
import ProductItem from '../shared/ProductItem'
import s from './AddedProducts.module.scss'

const CartProducts = ({ products }: { products: Product[] }) => {
  const renderCartProducts = products.map(
    ({ id, title, price, quantity, discountPercentage, total }: Product) => {
      return (
        <ProductItem
          key={id}
          id={id}
          title={title}
          price={price}
          quantity={quantity}
          discountPercentage={discountPercentage}
          discountedPrice={
            +countDiscount(price, discountPercentage) * quantity!
          }
          total={total}
        />
      )
    }
  )

  return <ul className={s.products}>{renderCartProducts}</ul>
}

export default CartProducts
