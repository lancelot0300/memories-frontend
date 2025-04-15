import { useEffect, useRef } from "react";
import {
  FormWrapper,
  LoginContainer,
  InputWrapper,
  Button,
  StyledField,
  RegisterInfo,
  Header,
  RememberMe,
  Logo,
  AboutUs,
  InformationWrapper,
  Loading,
} from "./login.styles";
import * as yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useAppDispatch } from "../../state/store";
import { loginSuccess } from "../../state/features/auth/authSlice";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { setUnkownPathAndFetchAsync } from "../../state/features/path/pathSlice";
import { extractErrorMessage } from "../../utils/homeUtils";

type ILoginFormValues = {
  Username: string;
  Password: string;
};

type IError = {
  Description: string;
};

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const rememberRef = useRef<HTMLInputElement>(null);

  const schema = yup.object().shape({
    Username: yup.string().min(5).required("Username is required"),
    Password: yup.string().min(5).required("Password is required"),
  });

  const onSubmit = async ({ Username, Password }: ILoginFormValues) => {
    try {
      setStatus("")
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        { Username, Password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const isRemembered = rememberRef.current?.checked ? "true" : "false";
      localStorage.setItem("isRemembered", isRemembered);

      const sessionExpiry = new Date(new Date().getTime() + 30 * 60000);
      localStorage.setItem("sessionTill", sessionExpiry.toString());

      dispatch(loginSuccess(data));
      dispatch(setUnkownPathAndFetchAsync(""));
      navigate("/", { replace: true });
    } catch (e) {
      const error = e as AxiosError<IError>
      if (error.response) {
        setStatus(extractErrorMessage("Username or password is incorrect"));
      }
    }
  };

  const {
    values,
    errors,
    touched,
    status,
    setStatus,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid
  } = useFormik<ILoginFormValues>({
    initialValues: {
      Username: "",
      Password: "",
    },
    onSubmit,
    validationSchema: schema,
  });

  useEffect(() => {
    if (
      localStorage.getItem("isRemembered") === "true" &&
      rememberRef.current
    ) {
      rememberRef.current.checked = true;
    }
  }, []);

  return (
    <LoginContainer>
      <InformationWrapper>
        <FormWrapper>
          <Logo src="./images/logo-color.svg" alt="logo" />
          <Header>Log in</Header>
          <form onSubmit={handleSubmit} title="Login">
            <InputWrapper>
              <StyledField
                id="Username"
                name="Username"
                autoComplete="username"
                placeholder="Username"
                value={values.Username}
                onChange={handleChange}
                onFocus={() => setStatus("")}
                $isError={(!!errors.Username && touched.Username) || !!status}
              />
              <ErrorMessage $isError={!!errors.Username}>
                {touched.Username ? errors.Username : ""}
              </ErrorMessage>
            </InputWrapper>

            <InputWrapper>
              <StyledField
                type="password"
                autoComplete="current-password"
                id="Password"
                name="Password"
                placeholder="Password"
                value={values.Password}
                onChange={handleChange}
                onFocus={() => setStatus("")}
                $isError={(!!errors.Password && !!touched.Password) || !!status}
              />
              <ErrorMessage $isError={errors.Password && !!touched.Password}>
                {touched.Password ? errors.Password : ""}
              </ErrorMessage>
            </InputWrapper>

          {isValid && <ErrorMessage $isError={!!status}>{status}</ErrorMessage>}  

          {isSubmitting && <Loading/>}


            <Button disabled={isSubmitting} type="submit">Submit</Button>
            <RememberMe>
              <input type="checkbox" ref={rememberRef} name="remember" />
              <label htmlFor="remember">Remember me</label>
            </RememberMe>
          </form>

          <RegisterInfo onClick={() => navigate("/register")}>
            No account? Click here to register!
          </RegisterInfo>
        </FormWrapper>
        <AboutUs>
          <h1>About Us</h1>
          <span>
            We are a duo of software development enthusiasts - Krystian and
            Mateusz. Our project is a modern tool inspired by Explorer
            functionality in Windows. Krystian was responsible for the frontend,
            taking care of an intuitive and user-friendly interface, while
            Mateusz focused on the backend, ensuring smooth and reliability of
            the application. Our goal is to combine aesthetics with
            functionality, creating tools that make everyday work with with
            files and folders.
          </span>
        </AboutUs>
      </InformationWrapper>
    </LoginContainer>
  );
}

export default Login;
