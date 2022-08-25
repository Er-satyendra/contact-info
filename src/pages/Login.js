import Button from "@mui/material/Button";
import { Formik } from "formik";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#46139f",
      darker: "#46139f",
    },
    secondary: {
      main: "#ff7f50",
      contrastText: "#ff7f50",
    },
  },
});

function Login() {
  let navigate = useNavigate();

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-7 mx-auto">
            <div className="tab-content p-4 border rounded m-3 bg-warning">
              <div
                className="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
              >
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values, { setSubmitting }) => {
                    let token = JSON.stringify(values);
                    window.localStorage.setItem("token", token);
                    navigate("/dashboard");
                    setSubmitting(false);
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Enter Valid Email")
                      .required("Required"),
                    password: Yup.string().required("required"),
                  })}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <TextField
                          label="Email"
                          className="w-100"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          error={errors.email && touched.email && errors.email}
                          helperText={errors.email}
                        />
                      </div>

                      <div className="mt-3">
                        <TextField
                          type="password"
                          label="Password"
                          className="w-100"
                          name="password"
                          error={
                            errors.password &&
                            touched.password &&
                            errors.password
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          helperText={errors.password}
                        />
                      </div>

                      <div className="mt-4">
                        <ThemeProvider theme={theme}>
                          <Button
                            color="primary"
                            variant="outlined"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {" "}
                            Sign in
                          </Button>
                        </ThemeProvider>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
