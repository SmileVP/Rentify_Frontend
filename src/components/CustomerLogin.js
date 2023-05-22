import React from "react";
import { Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {
  let navigate = useNavigate();

  //to set condition for login
  let CustomerSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  //function for customer-login
  let handleLogin = async (values) => {
    try {
      let res = await axios.post(`${url}/customer/customer-login`, {
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("name", res.data.user.firstName);
        sessionStorage.setItem("email", res.data.user.email);
        toast.success(res.data.message);
        navigate("/products");
      }
    } catch (err) {
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
          validationSchema={CustomerSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ errors, touched }) => (
            <div className="container-fluid customer-login">
              <div className="customerLoginForm">
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-secondary "
                    onClick={() => navigate("/admin-login")}
                  >
                    Admin Login
                  </Button>
                </div>
                <div className="customerLogin-title">
                  <h1>Welcome to Rentify</h1>
                </div>

                <div className=" customerLogin-header ">
                  <p>Customer-Login</p>
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

                  <div className="pt-3 d-flex justify-content-between">
                    <Button variant="outline-secondary" type="submit">
                      Login
                    </Button>

                  </div>
                </Form>

                <div className="text-white text-center mt-2">
                  <h6>New to Rentify? Please Sign-Up</h6>
                  <div>
                    <Button
                      variant="outline-secondary"
                      onClick={() => navigate("/customer-sign-up")}
                    >
                      Sign-Up
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CustomerLogin;
