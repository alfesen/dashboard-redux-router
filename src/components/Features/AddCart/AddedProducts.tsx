import { Product } from '../../../types'
import { countDiscount } from '../../../helpers'
import ProductItem from '../shared/ProductItem'
import s from './AddedProducts.module.scss'

const CartProducts = ({ products }: { products: Product[] }) => {
  const renderCartProducts = products.map((p: Product) => {
    return (
      <ProductItem
        key={p.id}
        id={p.id}
        title={p.title}
        price={p.price}
        quantity={p.quantity}
        discountPercentage={p.discountPercentage}
        discountedPrice={
          +countDiscount(p.price, p.discountPercentage) * p.quantity!
        }
        total={p.total}
      />
    )
  })

  return <ul className={s.products}>{renderCartProducts}</ul>
}

export default CartProducts
