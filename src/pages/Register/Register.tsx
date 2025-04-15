import * as yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useAppDispatch } from "../../state/store";
import { loginSuccess } from "../../state/features/auth/authSlice";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  Header,
  Logo,
  RegisterInfo,
  FormWrapper,
  LoginContainer,
  InputWrapper,
  Button,
  StyledField,
  InformationWrapper,
  Loading,
} from "../Login/login.styles";
import { setUnkownPathAndFetchAsync } from "../../state/features/path/pathSlice";
import { extractErrorMessage } from "../../utils/homeUtils";

type ILoginFormValues = {
  Email: string;
  Username: string;
  Password: string;
  ConfirmPassword: string;
};

type IError = {
  Description: string;
};

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    Email: yup.string().email().required("Email is required"),
    Username: yup.string().min(5).required("Login is required"),
    Password: yup.string().min(5).required("Password is required"),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password")], "Passwords must match")
      .required("Enter your password again")
    });

  const onSubmit = async ({ Username, Password, Email }: ILoginFormValues) => {
    setStatus("")
    try {
      const register = await axios.post(
        process.env.REACT_APP_API_URL + "/user/register",
        {
          Username,
          Password,
          Email,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(loginSuccess(register.data));
      dispatch(setUnkownPathAndFetchAsync(""));

      const sessionExpiry = new Date(new Date().getTime() + 30 * 60000);
      localStorage.setItem("sessionTill", sessionExpiry.toString());

      navigate("/", { replace: true });
    } catch (e) {
      const error = e as AxiosError<IError>
      if (error.response) {
        setStatus(extractErrorMessage(error.response.data.Description));
      }
    }
  };

  const {
    values,
    errors,
    touched,
    status,
    isValid,
    setStatus,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik<ILoginFormValues>({
    initialValues: {
      Email: "",
      Username: "",
      Password: "",
      ConfirmPassword: "",
    },
    onSubmit,
    validationSchema: schema,
  });

  return (
    <LoginContainer>
      <InformationWrapper>
        <FormWrapper>
          <Logo src="./images/logo-color.svg" alt="logo" />
          <Header> Register </Header>
          <form onSubmit={handleSubmit} title="Login">
            <InputWrapper>
              <StyledField
                id="Email"
                name="Email"
                type="email"
                placeholder="Email"
                value={values.Email}
                onChange={handleChange}
                $isError={(!!errors.Email && !!touched.Email) || !!status}
              />
              <ErrorMessage $isError={!!errors.Email}>
                {touched.Email ? errors.Email : ""}
              </ErrorMessage>
            </InputWrapper>

            <InputWrapper>
              <StyledField
                id="Username"
                name="Username"
                placeholder="Username"
                value={values.Username}
                onChange={handleChange}
                $isError={(!!errors.Username && !!touched.Username) || !!status}
              />
              <ErrorMessage $isError={!!errors.Username}>
                {touched.Username ? errors.Username : ""}
              </ErrorMessage>
            </InputWrapper>

            <InputWrapper>
              <StyledField
                type="password"
                id="Password"
                name="Password"
                placeholder="Password"
                value={values.Password}
                onChange={handleChange}
                $isError={(!!errors.Password && !!touched.Password) || !!status}
              />
              <ErrorMessage $isError={!!errors.Password && !!touched.Password}>
                {touched.Password ? errors.Password : ""}
              </ErrorMessage>
            </InputWrapper>

            <InputWrapper>
              <StyledField
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                placeholder="Confirm Password"
                value={values.ConfirmPassword}
                onChange={handleChange}
                $isError={(!!errors.ConfirmPassword && !!touched.ConfirmPassword) || !!status}
              />
              <ErrorMessage $isError={!!errors.ConfirmPassword && !!touched.ConfirmPassword}>
                {touched.ConfirmPassword ? errors.ConfirmPassword : ""}
              </ErrorMessage>
            </InputWrapper>

            {isValid && <ErrorMessage $isError={!!status}>{status}</ErrorMessage>}  

            {isSubmitting && <Loading/>}

            <Button disabled={isSubmitting} type="submit">Submit</Button>
          </form>
          <RegisterInfo onClick={() => navigate("/login", {replace: true})}>
            Already account? Log in!
          </RegisterInfo>
        </FormWrapper>
      </InformationWrapper>
    </LoginContainer>
  );
}

export default Register;
