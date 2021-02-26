import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: "",
    director: "",
    metascore: null,
}

const AddForm = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const { push } = useHistory();
    
    const changeHandler = (e) => {
        setMovie({
          ...movie,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = (e) => {
          e.preventDefault();
        //   axios.post(`http://localhost:5000/api/movies`)
        //   .then(res => {
        //     props.setMovieList(res.data);
        //     push('/');
        //   })
        //   .catch(err => {
        //       console.log(err);
        //   })
      }

    return (
        <div>
            <h3>Add Movie</h3>
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
            <button>Add</button>
            </form>
        </div>
    )
}

export default AddForm;