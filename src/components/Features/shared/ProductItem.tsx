import { Product } from '../../../types'
import Button from '../../UI/Button'
import Card from '../../UI/Card'

import s from './ProductItem.module.scss'

const ProductItem = ({
  id,
  title,
  price,
  discountedPrice,
  discountPercentage,
  total,
  quantity,
  add,
  onAdd,
}: Product) => {
  return (
    <Card className={s.product}>
      <h2 className={s.product__header}>
        {id}. {title}
      </h2>
      <div className={s.product__body}>
        <p className={s.product__info}>
          Price: <span>${price.toFixed(2)}</span>
        </p>
        <p className={s.product__info}>
          Discounted Price: <span>${(discountedPrice / quantity!).toFixed(2)}</span>
        </p>
        <p className={s.product__info}>
          Discount Percentage: <span>{discountPercentage}%</span>
        </p>
        {quantity && (
          <p className={s.product__info}>
            Quantity: <span>{quantity}</span>
          </p>
        )}
      </div>
      {total && (
        <h3 className={s.product__total}>
          Total: <span>${total.toFixed(2)}</span>
        </h3>
      )}
      {add && (
        <div className={s.product__actions}>
          {onAdd && (
            <Button
              className={s.product__add}
              onClick={() => {
                onAdd()
              }}>
              Add to Cart
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}

export default ProductItem
