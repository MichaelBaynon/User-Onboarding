import React, { useState, useEffect } from "react";

import "./App.css";
import { Form, Formik, Field, withFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import axios from "axios";

const App = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div>
      <h1>User Form</h1>

      <Form>
        <Field className="input" type="text" name="name" placeholder="name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field
          className="input"
          type="email"
          name="email"
          placeholder="email@example.com"
        />
        {touched.email && errors.name && (
          <p className="error">{errors.email}</p>
        )}
        <Field
          className="input"
          type="password"
          name="password"
          placeholder="password"
        />
        {touched.password && errors.name && (
          <p className="error">{errors.password}</p>
        )}
        <label className="tos">
          <Field
            type="checkbox"
            name="newsletter"
            checked={values.newsletter}
          />
          Agree to our ToS
        </label>
        <button>Submit</button>
      </Form>
    </div>
  );
};

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("name is a required field!"),
    email: Yup.string().required("email is a required field!"),
    password: Yup.string().required("password is a required field!")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post(" https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(App);

export default FormikApp;
