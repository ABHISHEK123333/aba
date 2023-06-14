import React from 'react'
import ReactDom from 'react-dom'
import { Icon } from 'react-icons-kit'
import {cross} from 'react-icons-kit/icomoon/cross'
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn btn-danger fs-7' style={{ marginLeft: "93%", marginTop: "-30px" }} onClick={onClose}> <Icon icon={cross}/> </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}
