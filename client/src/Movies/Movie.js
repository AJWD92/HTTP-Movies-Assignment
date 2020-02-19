import React, { useState, useEffect } from 'react'
import axios from 'axios';

import MovieCard from './MovieCard';

import { Button } from 'react-bootstrap';

const Movie = (props ) => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:5000/movies/${props.params.match.id}`)
        .then(res => {
            console.log(res)
            setMovie(res.data)
        })
        .catch(err => console.log(err));
    }, [props.match.params.id]);

    const deleteMovie = () => {
        axios
        .delete(`http://localhost:5000/movies/${props.match.params.id}`, movie)
        .then(res => {
            console.log(res)
            setMovie(res.data)
        })
        .catch(err => console.log(err));
    };

    
    return (
        <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <Button variant='outline-primary'  className="save-btn" onClick={this.saveMovie}>
          Save
        </Button>
        <Button variant='outline-info' className='edit-btn' onClick={() => this.props.history.push(`update-movie/${this.props.state.movie.id}`)}
        >
          Edit
        </Button>
        <Button variant='outline-danger' className='del-btn' onClick={this.deleteMovie}>
          Delete
        </Button>
      </div>
    )
}


export default Movie