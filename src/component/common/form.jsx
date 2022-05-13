import React, { useState } from "react";
import Joi from "joi-browser";

const Form = ({ schema }) => {
  const [data, setData] = useState({ username: "", password: "" });

  const [error, setError] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemas = {
      [name]: schema[name],
    };
    const { error } = Joi.validate(obj, schemas);
    return error ? error.details[0].message : null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    console.log(errors);

    setError(errors || {});

    if (errors) return;

    // const user = username.current.value; using ref
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
};

export default Form;
