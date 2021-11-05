import React from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const API_URL = "https://tech-library-api.herokuapp.com/auth/register";

function RegistrationForm() {
  // const {history} = this.props;
  const history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        validate={values => {
          const errors = {};

          if (!values.username) {
            errors.username = "Required"
          }
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
          console.log(values.email);

          try {
            const { username, email, password } = values;
            const { data } = await axios.post(API_URL, {
              username,
              email,
              password
            });
            console.log(data.message);
            toast.success(data.message);

            history.push({
              pathname: '/login',
            });
          }
          catch (err) {
            toast.error(err.response.data.error);
          }

          resetForm({ values: '' })
        }}
      >
        {() => (
          <div className="main">
            <Container className="Registercontainer">

              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />
              <Form>
                <label>User Name :  </label><br />
                <Field type="text" name="username" /><br />
                <ErrorMessage name="username">
                  {msg => <div style={{ color: 'red', paddingLeft: "100px", fontWeight: "bold" }}>{msg}</div>}
                </ErrorMessage><br />

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

                <Button type="submit">
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

export default RegistrationForm;


