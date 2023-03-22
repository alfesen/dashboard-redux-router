import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import CartsList from '../Features/CartsList/CartsList'
import Header from './Header'
import s from './MainLayout.module.scss'
const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <main className={s.main}>
        <CartsList />
        <Outlet />
      </main>
    </Fragment>
  )
}

export default MainLayout
