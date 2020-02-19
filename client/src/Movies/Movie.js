import React,{useState, useEffect} from "react";
import MovieCard from "./MovieCard";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import api from '../utils/api';

const Movie = (props) => {
  const [movie, setMovie] = useState({
    id:'',
    directer:'',
    title:'',
    stars:[],
    metascore:''
  })

  useEffect(() => {
    api().get(`/movies/${props.match.params.id}`)
      .then(res => {
        setMovie(res.data)
      })
      .catch(err => console.log(err));
  }, [props.match.params.id])

  const deleteMovie = (movie) => {
    api().delete(`/movies/${props.match.params.id}`, movie)
      .then(res => {
        props.history.push(`/`)
      })
      .catch(err => {
        console.log(err)
      })
  }
  if(!movie){
      return <div>Loading movie information...</div>;
    }
      return (
        <div className="save-wrapper">
            <MovieCard movie={movie} />
                <Button variant='outline-primary'  className="save-btn">
                Save
                </Button>
                <Link to={`/update-movie/${movie.id}`}>
                <Button variant='outline-info' className='edit-btn'
                >
                Edit
                </Button>
                </Link>
                <Button variant='outline-danger' className='del-btn' onClick={deleteMovie}>
                Delete
                </Button>
        </div>
  )
}

export default Movie;