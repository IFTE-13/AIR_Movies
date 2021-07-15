import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";


const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results)
      })
    setMovies(movies);
  }

  useEffect(() => {
    getMovies(FEATURED_API);
  }, [])

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm)
    }

  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <header>
          <h3>Air💢Movies</h3>
          <input type="text" placeholder="Search..." className="search" value={searchTerm} onChange={handleOnChange} />
        </header>
      </form>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => <Movie {...movie} key={movie.id} />)}
      </div>
      <footer>
        <p className="footer">©All rights reserved by IFTE'13@2021</p>
      </footer>
    </div>
  );
}

export default App;
