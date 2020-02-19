import React, {useState} from 'react';
import api from '../utils/api';

import { Form, Button } from 'react-bootstrap';

const AddMovie = (props) => {

    const [newMovie, setNewMovie] = useState({
      id: '',
      title: '',
      director: '',
      metascore: '',
      stars: []
  })

    const handleChange = (e) => {
      if (e.target.name === 'stars') {
        setNewMovie({
          ...newMovie,
          stars: e.target.value.split(',')
        });
      } else {
        setNewMovie({
          ...newMovie,
          [e.target.name]: e.target.value
        })
      };
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        
        api()
            .post('/movies', newMovie)
            .then(response => {
              console.log(response)
              setNewMovie({
                id: '',
                title: '',
                director: '',
                metascore: '',
                stars: []
              })
              props.history.push("/");
            })
            .catch(error => {
                console.log('Failed to create a new movie', error)
            })
    }

    return(
      <div className='add-movie'>
          <h1>Add Movie</h1>
      <Form onSubmit={handleSubmit} className='edit-form'>
          <Form.Group controlId='formTitle'>
          <Form.Label>Title:</Form.Label>
          <Form.Control
          type='title'
          name='title'
          value={newMovie.title}
          onChange={handleChange}
          />
          </Form.Group>

          <Form.Group controlId='formDirector'>
          <Form.Label>Director:</Form.Label>
          <Form.Control
          type='director'
          name='director'
          value={newMovie.director}
          onChange={handleChange}
          />
          </Form.Group>

          <Form.Group controlId='formMetascore'>
          <Form.Label>Metascore:</Form.Label>
          <Form.Control
          type='metascore'
          name='metascore'
          value={newMovie.metascore}
          onChange={handleChange}
          />
          </Form.Group>

          <Form.Group controlId='formStars'>
          <Form.Label>Stars:</Form.Label>
          <Form.Control
          type='stars'
          name='stars'
          value={newMovie.stars}
          onChange={handleChange}
          />
          </Form.Group>
    
          <Button variant='primary' className='update-button'>Add</Button>
      </Form>
  </div>
    )
}

export default AddMovie;