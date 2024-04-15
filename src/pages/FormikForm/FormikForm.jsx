import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdError } from "react-icons/md";
function FormicForm() {
  return (
    <div className="container">
      <div className="card">
        <h1>Register Here!</h1>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Username is Required";
            }

            if (!values.email) {
              errors.email = "Email is Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is Required";
            } else if (values.password.length < 6) {
              errors.password = "Password should be at least 6 characters";
            }
          
            return errors;
          }}
          validateOnChange={true}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="loginForm">
              <div className="inputContainer">
                <div className="inputDiv">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    className="error"
                    name="username"
                    component="div"
                  >
                    {(msg) => (
                      <div className="error">
                        <MdError className="icon" />
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="inputDiv">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage className="error" name="email" component="div">
                    {(msg) => (
                      <div className="error">
                        <MdError className="icon" />
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="inputDiv">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    className="error"
                    name="password"
                    component="div"
                  >
                    {(msg) => (
                      <div className="error">
                        <MdError className="icon" />
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting || !isValid}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FormicForm;
