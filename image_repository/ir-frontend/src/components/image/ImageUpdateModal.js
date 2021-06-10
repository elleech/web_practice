import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function ImageUpdateModal({ show, handleHide, image }) {
    const [newTitle, setNewTitle] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newDate, setNewDate] = useState(image.date);
    const [newPrice, setNewPrice] = useState(image.price);
    const [newStock, setNewStock] = useState(image.stock);

    const history = useHistory();

    const updateImage = async (e) => {
        e.preventDefault();
        try {
            const imageId = image._id;

            // backend create image
            const updateImageData = { newTitle, newImageUrl, newDate, newPrice, newStock };
            console.log(updateImageData);
            await axios.put('http://localhost:8000/image/' + imageId, updateImageData);

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
                <Modal.Title>Update an image</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ updateImage }>
                <Modal.Body>
                    <Form.Group controlId='title'>
                        <Form.Label>Change title?</Form.Label>
                        <Form.Control type='text' placeholder={ image.title } onChange={ (e) => setNewTitle(e.target.value) } value={ newTitle } />
                    </Form.Group>
                    <Form.Group controlId='imageUrl'>
                        <Form.Label>Change image URL?</Form.Label>
                        <Form.Control type='text' placeholder={ image.imageUrl } onChange={ (e) => setNewImageUrl(e.target.value) } value={ newImageUrl } />
                    </Form.Group>
                    <Form.Group controlId='date'>
                        <Form.Label>Change date?</Form.Label>
                        <Form.Check type='datetime-local' onChange={ (e) => setNewDate(new Date(e.target.value).toISOString()) } />
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Change price?</Form.Label>
                        <Form.Control type='number' step='0.01' min='0' placeholder={ image.price } onChange={ (e) => setNewPrice(parseFloat(e.target.value)) } value={ newPrice } />
                    </Form.Group>
                    <Form.Group controlId='stock'>
                        <Form.Check type='checkbox' label='Has stock?' onChange={ (e) => setNewStock(e.target.checked) } value={ newStock } checked={ newStock === true ? 'checked' : '' } />
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

export default ImageUpdateModal;
