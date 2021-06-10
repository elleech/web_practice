import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function ImageCreateModal({ show, handleHide }) {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [date, setDate] = useState(Date.now());
    const [price, setPrice] = useState(Number);

    const history = useHistory();

    const createImage = async (e) => {
        e.preventDefault();
        try {
            // backend create image
            const createImageData = { title, imageUrl, date, price };
            await axios.post('http://localhost:8000/image/', createImageData);

            // go back & refresh my image page
            history.push('/my_image');
            history.go(0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal show={ show } onHide={ handleHide } backdrop='static' centered>
            <Modal.Header>
                <Modal.Title>Create an image</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ createImage }>
                <Modal.Body>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' placeholder='Please enter title' onChange={ (e) => setTitle(e.target.value) } value={ title } />
                    </Form.Group>
                    <Form.Group controlId='imageUrl'>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type='text' placeholder='Please enter URL' onChange={ (e) => setImageUrl(e.target.value) } value={ imageUrl } />
                    </Form.Group>
                    <Form.Group controlId='date'>
                        <Form.Label>Date</Form.Label>
                        <Form.Check type='datetime-local' placeholder='Please enter date' onChange={ (e) => setDate(new Date(e.target.value).toISOString()) } />
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' step='0.01' min='0' placeholder='Please enter price' onChange={ (e) => setPrice(parseFloat(e.target.value)) } value={ price } />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button type='button' variant="dark" onClick={ handleHide }>Cancel</Button>
                    <Button type='submit' variant="success" onClick={ handleHide }>Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ImageCreateModal;
