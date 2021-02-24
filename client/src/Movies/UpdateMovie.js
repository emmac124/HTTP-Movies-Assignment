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
    
    const changeHandler = (ev, value) => {
        setMovie({
          ...movie,
          [ev.target.name]: value
        });
      };

      const handleSubmit = (e) => {
          e.preventDefault();
          axios.put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
              props.movies(res.data);
              push('http://localhost:5000');
          })
          .catch(err => {
              console.log(err);
          })
      }

    return (
        <div>
            <h3>Update Movie Information</h3>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
            />
            <input
                type='text'
                name='director'
                onChange={changeHandler}
                placeholder='director'
            />
            <input
                type='number'
                name='metascore'
                onChange={changeHandler}
                placeholder='metascore'
            />
            <button className="form-button">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
