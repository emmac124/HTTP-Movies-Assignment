import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import AddForm from './Movies/AddForm';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { push } = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const handleAdd = () => {
    push('/add-movie');
  }

  useEffect(() => {
    getMovieList();
  }, []);


  return (
    <>
      <SavedList list={savedList} />
      
      <button onClick={handleAdd}>Add Movie</button>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path='/movies/:id'>
        <Movie addToSavedList={addToSavedList} />
      </Route>

    <Route path='/update-movie/:id'>
      <UpdateMovie setMovieList={setMovieList} movieList={movieList} />
    </Route>

    <Route path='/add-movie'>
      <AddForm setMovieList={setMovieList} movieList={movieList} />
    </Route>

    </>
  );
};

export default App;
