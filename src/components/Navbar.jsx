import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React,{useState} from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutSuccess } from "../redux/userRedux"
import avatar from "../assets/avatar.jpeg"

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  ${mobile({ marginLeft:"10px" })}
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  /* ${mobile({ flex: 0.5 })} */
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "16px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items:center;
  position: relative;
  
`;

const MenuItem = styled.div`
  height: 60px;
  font-size: 14;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Profile = styled.img`
  width:60%;
  height:60%;
  border-radius:60%;
  ${mobile({ width: "40%", height: "40%",boderRadius:"40%" })};


`
const PopupWrapper = styled.div`
position: "absolute";
display: "flex";
flex-direction: "column";
top: '50px';
z-index: 2;
right: '20px';
`
const PopupItem =styled.button`

`

const Navbar = (props) => {
  const { quantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  // const [profileFlag,setProfileFlag] = useState(false)
  // console.log("🚀 ~ file: Navbar.jsx ~ line 89 ~ Navbar ~ profileFlag", profileFlag)

  const logout = () => {
    dispatch(logoutSuccess())
    
  }


  return (
    <Container >
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo>Shop</Logo>
          </Link>
        </Center>
        <Right>
          {!user ? (
            <>
              
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Register</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Sign In</MenuItem>
              </Link>{" "}
            </>
          ) : (
            <>
          
              <Link to={"/cart"}>
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
              <MenuItem>
              <Profile src={user?.img || avatar} onClick={()=> props.setProfileFlag(p=> !p)}/>
              </MenuItem>
              {props.profileFlag && 
              <PopupWrapper style={ {position: "absolute",display: "flex",flexDirection: "column",top: '50px',zIndex: 2,right: '20px',
      }}>
        <Link to={`/profile/${user?._id}`}>
        <PopupItem>{`${user?.username} profile`}</PopupItem>
        </Link>
        <PopupItem></PopupItem>
        <PopupItem onClick={logout}>Logout</PopupItem>
      </PopupWrapper>}
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
