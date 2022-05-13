import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import { getGenres } from "../services/genreServices";
import { saveMovie, getMovie } from "./../services/movieService";
import { useNavigate, useParams } from "react-router-dom";
import Select from "./common/select";
import { validating, validatingProperty } from "./utils/validate";
import Button from "./common/button";
import { mapTOViewModel } from "./utils/mapToView";

const MovieForm = () => {
  const [data, setData] = useState({
    title: "",
    numberInStock: "",
    dailyRentalRate: "",
    genreId: "",
  });
  const [error, setError] = useState({});
  const [genre, setGenre] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const schema = {
    _id: Joi.string(),
    genreId: Joi.string().required().label("Genre"),
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().label("Rate").min(0).max(100),
  };
  const result = validating(data, schema);

  useEffect(() => {
    const fetchGenreData = async () => {
      const { data } = await getGenres();
      const genres = [...data];
      setGenre(genres);
    };

    fetchGenreData();

    const movieId = params.id;
    if (movieId === "new") return;

    const fetchMovieData = async () => {
      try {
        const { data: film } = await getMovie(movieId);
        setData(mapTOViewModel(film));
      } catch (err) {
        if (err.response && err.response.status === 404)
          navigate("/not-found", { replace: true });
      }
    };
    fetchMovieData();
  }, [params.id, navigate]);

  // useEffect(() => username.current.focus(), []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = result;
    setError(errors || {});

    if (errors) return;
    await saveMovie(data);

    navigate("/movies", { replace: true });
  };

  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...error };
    const validated = validatingProperty(input, schema);

    const errorMessage = validated;
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const datas = { ...data };
    datas[input.name] = input.value;

    setData(datas);
    setError(errors);
  };
  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Title"
          value={data.title}
          focus={true}
          error={error.title}
          onChange={handleChange}
        />
        <Select
          name="genreId"
          label="Genres"
          value={data.genreId}
          options={genre}
          onChange={handleChange}
          error={error.genreId}
        />

        <Input
          name="numberInStock"
          label="Number In Stock"
          value={data.numberInStock}
          focus={false}
          error={error.numberInStock}
          onChange={handleChange}
        />
        <Input
          name="dailyRentalRate"
          label="Rate"
          value={data.dailyRentalRate}
          focus={false}
          error={error.dailyRentalRate}
          onChange={handleChange}
        />
        <Button determinant={result} label="Save" />
      </form>
    </div>
  );
};

export default MovieForm;
