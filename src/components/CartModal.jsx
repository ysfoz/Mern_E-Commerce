import React from 'react'
import { ModalContainer,ModalHeader,Button } from './styles/CartModal.style'

const CartModal = ({setModalFlag}) => {
    return (
        <ModalContainer>
            <ModalHeader>
modal
            </ModalHeader>
            <Button onClick={()=>setModalFlag(false)}>Close</Button>
            
        </ModalContainer>
    )
}

export default CartModal
