import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: "",
    director: "",
    metascore: null,
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then((res)=>{
            setMovie(res.data);
          })
          .catch(err => {
              console.log(err);
          })
    }, []);
    
    const changeHandler = (e) => {
        setMovie({
          ...movie,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = (e) => {
          e.preventDefault();
          axios.put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
              props.setMovieList(
                  props.movieList.map(movie => {
                    if(String(movie.id) === String(id)){
                        return(res.data);
                    } else {
                        return(movie);
                    }
                  })
              );
              push('/');
          })
          .catch(err => {
              console.log(err);
          })
      }

    return (
        <div>
            <h3>Update Movie Information</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label><br />
                    <input
                        type="text"
                        name="title"
                        onChange={changeHandler}
                        value={movie.title}
                        placeholder="title"
                    /><br />
                    <label>Director: </label><br />
                    <input
                        type='text'
                        name='director'
                        onChange={changeHandler}
                        value={movie.director}
                        placeholder='director'
                    /><br />
                    <label>Metascore: </label><br />
                    <input
                        type='number'
                        name='metascore'
                        onChange={changeHandler}
                        value={movie.metascore}
                        placeholder='metascore'
                    /><br />
                </div>
            <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
