import {
  Container,
  Wrapper,
  Left,
  SearchContainer,
  Input,
  Center,
  Logo,
  Right,
  MenuItem,
  Profile,
  PopupWrapper,
  PopupItem,
  LinkLogo,
} from "./styles/Navbar.style";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/userRedux";
import { removeall } from "../redux/cartRedux";
import { setUserSearchInput } from "../redux/productRedux";
import avatar from "../assets/avatar.jpeg";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/logo1.png";

const Navbar = (props) => {
  const { quantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [profileFlag, setProfileFlag] = useState(false);
  const location = useLocation();

  const logout = () => {
    dispatch(logoutSuccess());
    dispatch(removeall());
  };
  const setUserInput = (value) => {
    dispatch(setUserSearchInput(value));
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to={"/"}>
            <LinkLogo src={logo} />
          </Link>
          {location?.pathname === "/" && (
            <SearchContainer>
              <Input
                placeholder="Search"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Search style={{ color: "teal", fontSize: 16 }} />
            </SearchContainer>
          )}
          {location?.pathname === "/login" && (
            <SearchContainer>
              <Input
                placeholder="Search"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Search style={{ color: "teal", fontSize: 16 }} />
            </SearchContainer>
          )}
          {location?.pathname.includes("products") && (
            <SearchContainer>
              <Input
                placeholder="Search"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Search style={{ color: "teal", fontSize: 16 }} />
            </SearchContainer>
          )}
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
            <Logo>Shoppingoo</Logo>
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
                  <Badge badgeContent={quantity} color="secondary">
                    <ShoppingCartOutlined style={{ color: "teal" }} />
                  </Badge>
                </MenuItem>
              </Link>
              <MenuItem>
                <Profile
                  src={user?.img || avatar}
                  onClick={() => setProfileFlag((p) => !p)}
                />
              </MenuItem>
              {profileFlag && (
                <PopupWrapper
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    top: "50px",
                    zIndex: 2,
                    right: "20px",
                  }}
                >
                  <Link to={`/profile/${user?._id}`}>
                    <PopupItem
                      style={{ marginBottom: "3px" }}
                      name="true"
                    >{`${user?.username} profile`}</PopupItem>
                  </Link>

                  <PopupItem onClick={logout}>Logout</PopupItem>
                </PopupWrapper>
              )}
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
