import React from "react";
import { Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  //to set condition for admin login
  let UserSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  //function for admin login
  let handleLogin = async (values) => {
    try {
      let res = await axios.post(`${url}/adminLogin`, {
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        navigate("/adminHome");
      }
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={UserSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ errors, touched }) => (
            <div className="container-fluid login">
              <div className="loginForm">
                <div className="login-title">
                  <h1>Welcome to Rentify</h1>
                </div>

                <div className=" login-header ">
                  <p>Admin-Login</p>
                </div>

                <Form>
                  <div className="form-group">
                    <label htmlFor="email" className="text-white">
                      Email
                    </label>
                    <Field
                      name="email"
                      className="form-control"
                      type="email"
                      placeholder="Enter Email"
                    />
                    {errors.email && touched.email ? (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    ) : null}
                  </div>

                  <div className="form-group pt-2">
                    <label htmlFor="password" className="text-white">
                      Password
                    </label>
                    <Field
                      name="password"
                      className="form-control"
                      type="password"
                      placeholder="Enter password"
                    />
                    {errors.password && touched.password ? (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="pt-3 d-flex justify-content-around">
                    <Button variant="outline-secondary" type="submit">
                      Login
                    </Button>

                    <Button variant="outline-secondary" onClick={()=>navigate ("/admin-sign-up")}>
                      Admin SignUp
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login;
