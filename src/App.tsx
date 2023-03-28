import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartListActions } from './redux/cartListSlice'
import useFetchData from './hooks/useFetchData'
import MainLayout from './components/Layout/MainLayout'
import Cart from './components/Features/Cart/Cart'
import s from './App.module.scss'
import AddCart from './components/Features/AddCart/AddCart'
import Fallback from './components/UI/Fallback'
import { CartsResponse, State } from './types'

function App(): JSX.Element {
  const lowestId = useSelector(({ cartList }: State) => cartList.lowestId)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '*', element: <Fallback message='Page not found' dark /> },
        { path: '/', element: <Navigate to={`/${lowestId}`} /> },
        { path: '/:cartId', element: <Cart /> },
        { path: '/products', element: <AddCart /> },
      ],
    },
  ])

  const { sendRequest } = useFetchData()

  const dispatch = useDispatch()
  useEffect(() => {
    const fetchCarts = async () => {
      const { carts } = (await sendRequest(
        'https://dummyjson.com/carts'
      )) as unknown as CartsResponse

      dispatch(cartListActions.getCarts(carts))
    }
    fetchCarts()
  }, [dispatch, sendRequest])

  return (
    <div className={s.app}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
