import React, { useState, useEffect } from 'react';

import { Form, Button } from 'react-bootstrap';

import api from '../utils/api'

const UpdateMovie = (props) => {
 
    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    useEffect(() => {
        api().get(`/movies/${props.match.params.id}`)
            .then(result => {
                setMovie(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [props.match.params.id])

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleStars = e => {
        setMovie({
            ...movie,
            stars:[e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        api().put(`/movies/${movie.id}`, movie)
            .then(result => {
                console.log(result.data)
                props.history.push(`/`)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <h2>Update Movie</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    type='title'
                    name='title'
                    onChange={handleChange}
                    value={movie.title}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicDirector">
                    <Form.Label>Director</Form.Label>
                    <Form.Control
                    type='director'
                    name='director'
                    onChange={handleChange}
                    value={movie.director}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicMetascore">
                    <Form.Label>Metascore</Form.Label>
                    <Form.Control
                    type='metascore'
                    name='metascore'
                    onChange={handleChange}
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

export default UpdateMovie;