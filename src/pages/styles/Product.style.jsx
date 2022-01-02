import styled from "styled-components";

import { mobile,tablet } from "../../responsive";

export const Container = styled.div``;
export const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px",alignItems:"center" })}
  ${tablet({ flexDirection: "column", padding: "10px",alignItems:"center"})}
`;
export const ImgContainer = styled.div`
  flex: 1;
  ${mobile({ display: "flex", justifyContent:"center" })}
  ${tablet({ display: "flex", justifyContent:"center" })}
  
`;
export const Image = styled.img`
  object-fit: cover;
  ${mobile({ height: "60vh",width:'auto' })}
  ${tablet({ height: "70vh",width:'auto' })}
 
`;
export const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
  ${tablet({ padding: "10px" })}
  
`;
export const Title = styled.h1`
  font-weight: 200;
`;
export const Desc = styled.p`
  margin: 20px 0px;
`;
export const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

export const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${tablet({width: '100%',justifyContent:"space-between"})}
  ${mobile({ width: "100%", justifyContent:"space-between" })}
  
`;
export const Filter = styled.div`
  display: flex;
  align-items: center;
`;
export const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  
`;
export const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  ${tablet({width: '40px',height:"40px",margin:"0px 15px"})}
  

`;
export const FilterSize = styled.select`
  margin-left: 5px;
  padding: 5px;
  ${tablet({ fontSize: "20px" })}
  
`;
export const FilterSizeOption = styled.option`
`;

export const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%", justifyContent:"space-between" })}
  ${tablet({ width: "100%", justifyContent:"space-between" })}
`;
export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  ${tablet({marginRight: '100px'})}
`;
export const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
export const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;