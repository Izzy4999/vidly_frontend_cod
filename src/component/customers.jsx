import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import { toast } from "react-toastify";
import { getCurrentUser } from "../services/loginService";
import { useLocation, Navigate } from "react-router-dom";
import {addGenre} from "../services/genreServices"

const AddGenre = (props) => {
  //   const username = React.createRef();
  const [data, setData] = useState({ genre: "" });
  const [error, setError] = useState({});
  const schema = {
    genre: Joi.string().required().label("Genre"),
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
      await addGenre(data.genre);
      toast.success("Added successfully")
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...error };
        errors.genre = err.response.data;
      
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
  return !user ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <h1>Add Genre</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="genre"
          value={data.genre}
          label="Genre"
          onChange={handleChange}
          error={error.genre}
          focus={true}
        />
        <button disabled={validate()} className="btn btn-primary margin-top">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddGenre;
