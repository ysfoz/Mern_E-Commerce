import styled from "styled-components";
import { mobile } from '../../responsive';

export const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
export const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

export const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  ${mobile({ marginLeft:"10px" })}
`;
export const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
  /* ${mobile({ flex: 0.5 })} */
`;

export const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "16px" })}
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items:center;
  position: relative;
  
`;

export const MenuItem = styled.div`
  height: 60px;
  font-size: 14;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

export const Profile = styled.img`
  width:60%;
  height:60%;
  border-radius:60%;
  ${mobile({ width: "40%", height: "40%",boderRadius:"40%" })};


`
export const PopupWrapper = styled.div`
position: "absolute";
display: "flex";
flex-direction: "column";
top: '50px';
z-index: 2;
right: '20px';
`
export const PopupItem =styled.button`

`