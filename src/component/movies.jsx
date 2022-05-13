import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/paginarion";
import { paginate } from "./utils/paginate";
import Genre from "./genre";
import { getGenres } from "../services/genreServices";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Movies = ({ user }) => {
  // declaring states
  const [movies, setMovies] = useState([]);
  const [genres, setGenre] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  // handling page
  const [pages, setPages] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  // for getting sellected genre
  const [selectedGenre, setSelectedGenre] = useState();
  //to get allgenres

  useEffect(() => {
    const fetchGenreData = async () => {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];
      setGenre(genres);
    };
    const fetchMovieData = async () => {
      const { data: movies } = await getMovies();
      setMovies(movies);
    };
    fetchMovieData();
    fetchGenreData();
  }, []);

  const handleDelete = async (value) => {
    const originalMovies = movies;
    const films = originalMovies.filter((m) => m._id !== value._id);

    setMovies(films);
    try {
      await deleteMovie(value._id);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("This movie has been deleted");

        setMovies(originalMovies);
      }
    }
  };
  const handleLike = (movieId) => {
    const films = [...movies];
    const index = movies.indexOf(movieId);
    films[index] = { ...films[index] };
    films[index].like = !films[index].like;

    setMovies(films);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };
  const getPagedData = () => {
    const allMovies = movies;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const films = paginate(sorted, currentPage, pages);

    return { totalCount: filtered.length, data: films };
  };

  const { totalCount, data } = getPagedData();

  return (
    <div className="row">
      <div className="col-3">
        <Genre
          selectedItem={selectedGenre}
          items={genres}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        {" "}
        <div>
          {user && (
            <Link className="btn btn-primary margin-top" to="/movies/new">
              New Movie
            </Link>
          )}

          <p>showing {totalCount} in the database</p>
          <MoviesTable
            films={data}
            onDelete={handleDelete}
            onLike={handleLike}
            onSort={handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
