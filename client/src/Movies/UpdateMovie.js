import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Form, Button } from 'react-bootstrap';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMoive = props => {
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        axios
        .get(`http://lochost:5000/movies/${props.match.params.id}`)
        .then(res => {
            console.log(res)
            setMovie(res.data)
        })
        .catch(err => console.log(err))
    }, [props.match.params.id])

    const handleChanges = ev => {
        setMovie({
            ...movie,
            [ev.target.name]: ev.target.value
        });
    };

    const handleStars = e => {
        setMovie({
            ...movie,
            stars: [e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/movies/${movie.id}`, movie)
        .then(res => {
            props.updateMovies(res.data)
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    type='title'
                    name='title'
                    onChange={handleChanges}
                    value={movie.title}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicDirector">
                    <Form.Label>Director</Form.Label>
                    <Form.Control
                    type='director'
                    name='director'
                    onChange={handleChanges}
                    value={movie.director}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicMetascore">
                    <Form.Label>Metascore</Form.Label>
                    <Form.Control
                    type='metascore'
                    name='metascore'
                    onChange={handleChanges}
                    value={movie.metascore}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicStars">
                    <Form.Label>Stars</Form.Label>
                    <Form.Control
                    type='stars'
                    name='stars'
                    onChange={handleStars}
                    value={movie.stars}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>Update</Button>
            </Form>
        </div>
    )
}

export default UpdateMoive;