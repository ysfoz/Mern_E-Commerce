import styled from "styled-components";
import { mobile,tablet } from "../../responsive";

export const Container = styled.div`
  display: flex;
  width: 30%;
  margin-left: 15px;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
  ${mobile({width:"60%"})}
  ${tablet({width:"35%"})}
`;
export const Image = styled.img`
  flex: 1.3;
  height: 56%;
`;
export const HeaderWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
export const Title = styled.h6`
  overflow-wrap: break-word;
  font-size: 12px;
  font-weight: 400;
`;
export const Price = styled.span`
  overflow-wrap: break-word;
`;
export const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 1px solid lightgray;
`;

export const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: flex-start;
`;

export const Button = styled.button` 
background-color: teal;
color:white;
border:none;
border-radius: 5px;
padding: 5px 10px;
cursor:pointer;

`
