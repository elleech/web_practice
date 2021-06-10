import axios from 'axios';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function CompleteBuyModal({ show, handleHide, buy }) {
    const history = useHistory();

    const completeBuy = async (e) => {
        e.preventDefault();
        try {
            // backend update buy
            await axios.put('http://localhost:8000/buy/' + buy.detail._id, { completion: Date.now() });

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
                <Modal.Title>Confirm shipment</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ completeBuy }>
                <Modal.Body>
                    Have you shipped the image to our company?
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button type='button' variant="dark" onClick={ handleHide }>Cancel</Button>
                    <Button type='submit' variant="danger" onClick={ handleHide }>Confirm</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CompleteBuyModal;
