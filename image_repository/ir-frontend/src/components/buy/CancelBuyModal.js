import axios from 'axios';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function CancelBuyModal({ show, handleHide, order }) {
    const _id = order._id;

    const history = useHistory();

    const cancelBuy = async (e) => {
        e.preventDefault();
        try {
            // backend update buy
            await axios.put('http://localhost:8000/buy/' + _id, { cancellation: true });

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
                <Modal.Title>Confirm cancellation</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ cancelBuy }>
                <Modal.Body>
                    You are going to cancel the purchase of <strong>{ order.title }</strong> for <strong>${ order.price }</strong>
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button type='button' variant="dark" onClick={ handleHide }>Close</Button>
                    <Button type='submit' variant="danger" onClick={ handleHide }>Confirm</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CancelBuyModal;
