import { Fragment, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Card from './Card'

import s from './Overlay.module.scss'

type BackdropProps = {
  onClose: () => void
}
type OverlayProps = {
  children: ReactNode
  onClose: () => void
  className?: string
}

const Backdrop = (props: BackdropProps) => {
  return <div className={s.backdrop} onClick={props.onClose}></div>
}

const Overlay = (props: OverlayProps) => {
  const backdropHook = document.getElementById('overlay') as HTMLElement
  const modalHook = document.getElementById('overlay') as HTMLElement
  const content = (
    <Card className={`${props.className && props.className} ${s.modal}`}>
      {props.children}
    </Card>
  )
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose} />, backdropHook)}
      {createPortal(content, modalHook)}
    </Fragment>
  )
}

export default Overlay
