import axios from 'axios';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function BuyModal({ show, handleHide, image }) {
    const _imageId = image._id;

    const history = useHistory();

    const buy = async (e) => {
        e.preventDefault();
        try {
            // backend buy
            const buyData = { _imageId };
            await axios.post('http://localhost:8000/buy/', buyData);

            // go back & refresh my image page
            history.push('/my_order');
            history.go(0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal show={ show } onHide={ handleHide } backdrop='static' centered>
            <Modal.Header>
                <Modal.Title>Confirm purchase</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ buy }>
                <Modal.Body>
                    You are going to buy <strong>{ image.title }</strong> for <strong>${ image.price }</strong>
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button type='button' variant="dark" onClick={ handleHide }>Cancel</Button>
                    <Button type='submit' variant="danger" onClick={ handleHide }>Confirm</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default BuyModal;
