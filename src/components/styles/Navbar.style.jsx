import styled from "styled-components";
import { mobile, tablet } from "../../responsive";

export const Container = styled.div`
  height: 60px;
  background-color: floralwhite;
  ${mobile({ height: "50px" })}
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchContainer = styled.div`
  border: 0.5px solid teal;
  display: flex;
  align-items: center;

  ${mobile({ marginLeft: "10px" })}
  ${tablet({ marginRight: "10px" })}
`;
export const Input = styled.input`
  border: none;
  padding: 2px 7px;
  :focus {
    outline: none;
  }

  ${mobile({ width: "50px" })}
  ${tablet({ width: "90px" })}
`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export const Logo = styled.h1`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-weight: bold;
  color: teal;
  ${mobile({ fontSize: "16px" })}
  
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-right: 10px;
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
  width: 36px;
  height: 36px;
  border-radius: 18px;
  ${mobile({ width: "30px", height: "30px", boderRadius: "15px" })};
`;
export const PopupWrapper = styled.div`
  position: "absolute";
  display: "flex";
  flex-direction: "column";
  top: "50px";
  z-index: 2;
  right: "20px";
  background-color: white;
  border: 2px solid teal;
`;
export const PopupItem = styled.button`
  border: none;
  border-bottom: ${(props) => props.name && "1px solid teal"};
  background-color: white;
  padding: 6px 22px;
`;

export const LinkLogo = styled.img`
  width: 40px;
  margin: 5px 10px;
  ${mobile({ width: "30px" })}
`;
