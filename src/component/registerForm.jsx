import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import { register } from "../services/userServices";
import { loginwithjwt } from "../services/loginService";

const RegisterForm = (props) => {
  //   const username = React.createRef();
  const [data, setData] = useState({ username: "", password: "", name: "" });
  const [error, setError] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("name"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  // useEffect(() => username.current.focus(), []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setError(errors || {});
    if (errors) return;

    try {
      const response = await register(data.username, data.password, data.name);
      loginwithjwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...error };
        errors.username = err.response.data;

        setError(errors);
      }
    }
  };

  // const user = username.current.value; using ref

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

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={data.username}
          label="Username"
          onChange={handleChange}
          error={error.username}
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
        <Input
          name="name"
          value={data.name}
          label="Name"
          onChange={handleChange}
          error={error.name}
          focus={false}
          type="text"
        />
        <button disabled={validate()} className="btn btn-primary margin-top">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
