import React from 'react'
import { Container,ButtonContainer,Button} from "./styles/CartFooter.style"

const CartFooter = () => {
    return (
        <Container>
            <ButtonContainer>
                <Button>Delete</Button>
                <Button>Save for later</Button>
                <Button>See more like this</Button>
            </ButtonContainer>
        </Container>
    )
}

export default CartFooter
