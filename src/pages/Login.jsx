import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../helper/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
  margin:7px;
`;

const Link = styled.a`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: teal;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
`;

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("username is required")
        .min(3, "Username is too short - should be 3 chars minimum."),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum."),
    }),
    onSubmit: (values) => {
      login(dispatch, values);
    },
  });

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            placeholder="username"
            id="username"
            name="username"
            type="text"
            placeholder="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <Error>{formik.errors.username}</Error>
          ) : null}
          <Input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Error>{formik.errors.password}</Error>
          ) : null}
          <ButtonWrapper>
            <Button type="submit" disabled={isFetching}>
              LOGIN
            </Button>
            <Link href="/register">Create a new account</Link>
          </ButtonWrapper>
          {error && <Error>Something went wrong !!!</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
