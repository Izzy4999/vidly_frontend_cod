import Movies from "../src/component/movies.jsx";
import NavBar from "./component/navBar.jsx";
import { Route, Routes } from "react-router-dom";
import AddGenre from "./component/customers";
import Rentals from "./component/rentals";
import MovieForm from "./component/moviesForm";
import NotFound from "./component/notFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "./component/loginForm.jsx";
import RegisterForm from "./component/registerForm.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect, useState } from "react";
import Logout from "./component/logout.jsx";
import { getCurrentUser } from "./services/loginService";
import ProtectedRoutes from "./component/common/protectedRoute.jsx";

function App() {
  const [jwt, setJwt] = useState();
  useEffect(() => {
    const user = getCurrentUser();
    setJwt(user);
  }, []);
  return (
    <>
      <ToastContainer />
      <NavBar user={jwt} />
      <main className="container">
        <Routes>
          <Route index element={<Movies user={jwt} />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="logout" element={<Logout />} />
          <Route path="movies" element={<Movies user={jwt} />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="movies/:id" element={<MovieForm />} />
          </Route>

          <Route path="genre" element={<AddGenre />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
