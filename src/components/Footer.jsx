import {
  ContactItem,
  Container,
  Left,
  Logo,
  Desc,
  SocialContainer,
  SocialIcon,
  Center,
  Title,
  List,
  ListItem,
  Right,
  Payment,
} from "./styles/Footer.style";
import {
  Facebook,
  Instagram,
  Phone,
  Pinterest,
  Room,
  Twitter,
  MailOutline,
} from "@material-ui/icons";
import React from "react";

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>SHOPPING</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          libero nemo eveniet excepturi et ea tenetur consectetur sint hic
          voluptatibus.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Usefel Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: 10 }} />
          111 Michigan Ave, Chicago / IL{" "}
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: 10 }} />
          +1 123 45 67
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: 10 }} /> contact@shopping.com
        </ContactItem>

        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
