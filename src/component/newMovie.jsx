import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import { getGenres } from "../services/fakeGenreService.js";
import { saveMovie, getMovie } from "./../services/fakeMovieService";
import { useNavigate, useParams } from "react-router-dom";
import { makeId } from "./utils/makeId";

const NewMovie = () => {
  const [data, setData] = useState({
    title: "",
    numberInStock: "",
    dailyRentalRate: "",
    genreId: "",
  });
  const [error, setError] = useState({});

  const [genre, setGenre] = useState([]);

  const schema = {
    _id: Joi.string(),
    genreId: Joi.string().required().label("Genre"),
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    rate: Joi.number().required().label("Rate").min(0).max(100),
  };
  const params = useParams();
  const navigate = useNavigate();
  const mapTOViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  useEffect(() => {
    const genres = getGenres();
    setGenre(genres);
    const movieId = params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return navigate("*", { replace: true });

    setData(mapTOViewModel(movie));
  }, []);
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const id = makeId(24);

  const doSubmit = (movie) => {
    saveMovie(data);
    navigate("/movies", { replace: true });
  };
  // useEffect(() => username.current.focus(), []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    console.log(errors);

    setError(errors || {});

    if (errors) return;
    doSubmit();
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
  return (
    <div>
      <h1>New Movie</h1>{" "}
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Title"
          value={data.title}
          focus={true}
          error={error.title}
          onChange={handleChange}
        />
        <label htmlFor="genres">Genres</label>

        <Input
          name="numberInStock"
          label="Number In Stock"
          value={data.numberInStock}
          focus={false}
          error={error.numberInStock}
          onChange={handleChange}
        />
        <Input
          name="rate"
          label="Rate"
          value={data.rate}
          focus={false}
          error={error.rate}
          onChange={handleChange}
        />

        <button disabled={validate()} className="btn btn-primary margin-top">
          Register
        </button>
      </form>
    </div>
  );
};

export default NewMovie;
