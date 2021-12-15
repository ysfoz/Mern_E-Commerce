import {
  Container,
  Wrapper,
  Left,
  Language,
  SearchContainer,
  Input,
  Center,
  Logo,
  Right,
  MenuItem,
  Profile,
  PopupWrapper,
  PopupItem,
} from "./styles/Navbar.style";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutSuccess } from "../redux/userRedux";
import avatar from "../assets/avatar.jpeg";

const Navbar = (props) => {
  const { quantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  // const [profileFlag,setProfileFlag] = useState(false)
  // console.log("🚀 ~ file: Navbar.jsx ~ line 89 ~ Navbar ~ profileFlag", profileFlag)

  const logout = () => {
    dispatch(logoutSuccess());
  };

  return (
    <Container>
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
                <Profile
                  src={user?.img || avatar}
                  onClick={() => props.setProfileFlag((p) => !p)}
                />
              </MenuItem>
              {props.profileFlag && (
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
                    <PopupItem>{`${user?.username} profile`}</PopupItem>
                  </Link>
                  <PopupItem></PopupItem>
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
