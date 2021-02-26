import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => { 
        console.log(res.data)
        setMovie(res.data)
      })
      .catch((err) => console.log(err.response));
    }

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleEditClick = () => {
    push(`/update-movie/${params.id}`);
}

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button onClick={saveMovie}>
        Save
      </button>
      
      <button onClick={handleEditClick}className="md-button">
        Edit
      </button>
    </div>
  );
}

export default Movie;
