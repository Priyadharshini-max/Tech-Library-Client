import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import "../Login.css";

const API_URL = "http://localhost:3001/auth/login";

function LoginForm() {

  const history = useHistory();

  const [email, setEmail] = useState("");

  //Create login form using formik
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Email id Required';
          }
          else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = "Required"
          }
          return errors;
        }
        }
        onSubmit={async (values, { resetForm }) => {
          console.log(values);

          console.log("Submitted...");

          try {
            const { email, password } = values;
            var { data } = await axios.post(API_URL, {
              email,
              password
            });
            const tokenValue = data.token;
            localStorage.setItem("Token", tokenValue);
            localStorage.setItem("user", email);
            console.log("getusers", tokenValue);

            history.push({
              pathname: '/categoriesdetails'
            });

            setEmail(email);
          }
          catch (err) {
            toast.error(err.response.data.error);
          }
          resetForm({ values: '' })
        }}
      >
        {() => (
          <div className="main">
            <Container className="Logincontainer">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />
              <Form className="Form">
                <label>Email id :  </label><br />
                <Field type="email" name="email" /><br />
                <ErrorMessage name="email">
                  {msg => <div style={{ color: 'red', paddingLeft: "80px", fontWeight: "bold" }}>{msg}</div>}
                </ErrorMessage><br />

                <label>Password :  </label><br />
                <Field type="password" name="password" /><br />
                <ErrorMessage name="password">
                  {msg => <div style={{ color: 'red', paddingLeft: "100px", fontWeight: "bold" }}>{msg}</div>}
                </ErrorMessage><br />
                <div className="registerlink">Are you new to this app? <span><Link to="/register">Register here</Link></span> </div>
                <Link to="/forgotpassword" className="passwordLink">Forgot Password?</Link><br /><br />
                <Button variant="primary" type="submit" >
                  Submit
                </Button>

              </Form>
            </Container>
          </div>
        )}
      </Formik>
    </div>
  )
};

export default LoginForm;