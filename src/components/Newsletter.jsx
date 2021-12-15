import {
  Container,
  Title,
  Desc,
  InputContainer,
  Input,
  Button,
} from "./styles/Newsletter.style";
import { Send } from "@material-ui/icons";
import React from "react";

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your Email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
