import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import { getCurrentUser, login } from "../services/loginService";
import { useLocation, Navigate } from "react-router-dom";

const LoginForm = (props) => {
  //   const username = React.createRef();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const { state } = useLocation();

  // useEffect(() => username.current.focus(), []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setError(errors || {});
    if (errors) return;

    try {
      await login(data.email, data.password);
      window.location = state ? state.from.pathname : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...error };
        errors.username = err.response.data;

        setError(errors);
      }
    }

  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemas = {
      [name]: schema[name],
    };
    const { error } = Joi.validate(obj, schemas);
    return error ? error.details[0].message : null;
  };
  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...error };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const datas = { ...data };
    datas[input.name] = input.value;

    setData(datas);
    setError(errors);
  };
  const user = getCurrentUser();
  return user ? (
    <Navigate to="/" />
  ) : (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={data.email}
          label="Email"
          onChange={handleChange}
          error={error.email}
          focus={true}
        />
        <Input
          name="password"
          value={data.password}
          label="Password"
          onChange={handleChange}
          error={error.password}
          focus={false}
          type="password"
        />
        <button disabled={validate()} className="btn btn-primary margin-top">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
