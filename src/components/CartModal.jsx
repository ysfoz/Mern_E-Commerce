
import {
  ModalContainer,
  ModalHeader,
  Button,
  ModalHeaderWrapper,
  Wrapper,
  CardWrapper,
} from "./styles/CartModal.style";
import CartModalCard from "../components/CartModalCard";





const CartModal = ({ setModalFlag,data, selecedProduct}) => {
    





  return (
    <ModalContainer>
      <Wrapper>
        <ModalHeaderWrapper>
          <ModalHeader>More items like this</ModalHeader>
          <Button onClick={()=> setModalFlag(false)} >x</Button>
        </ModalHeaderWrapper>
        <CardWrapper>
            {data.map((item)=><CartModalCard key={item._id} item={item} selecedProduct={selecedProduct}/>)}
          
        </CardWrapper>
      </Wrapper>
    </ModalContainer>
  );
};

export default CartModal;
