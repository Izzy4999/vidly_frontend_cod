import React from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import { getCurrentUser } from "../services/loginService";

const MoviesTable = ({ films, onSort, sortColumn, onLike, onDelete }) => {
  const user = getCurrentUser();
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.like} movie={movie} onClick={() => onLike(movie)} />
      ),
    },
  ];
  if (user && user.isAdmin)
    columns.push({
      key: "delete",
      content: (movie) => (
        <button onClick={() => onDelete(movie)} className="btn btn-danger m-2">
          Delete
        </button>
      ),
    });
  return (
    <Table
      columns={columns}
      data={films}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
