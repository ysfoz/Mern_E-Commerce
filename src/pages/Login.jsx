import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Error,
  ButtonWrapper,
  Button,
  Link,
} from "./styles/Login.style";
import { login } from "../helper/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

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
