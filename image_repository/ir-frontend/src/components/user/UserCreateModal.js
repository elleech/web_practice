import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function UserCreateModal({ show, handleHide }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [payment, setPayment] = useState(0);
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState('');

    const history = useHistory();

    const createUser = async (e) => {
        e.preventDefault();
        try {
            // backend create user
            const createUserData = { firstname, lastname, payment, phone, address };
            await axios.post('http://localhost:8000/user/', createUserData);

            // go back & refresh my account page
            history.push('/my_account');
            history.go(0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal show={ show } onHide={ handleHide } backdrop='static' centered>
            <Modal.Header>
                <Modal.Title>Create your shipping info</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ createUser }>
                <Modal.Body>
                    <Form.Group controlId='firstname'>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type='text' placeholder='Please enter first name' onChange={ (e) => setFirstname(e.target.value) } value={ firstname } />
                    </Form.Group>
                    <Form.Group controlId='lastname'>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type='text' placeholder='Please enter last name' onChange={ (e) => setLastname(e.target.value) } value={ lastname } />
                    </Form.Group>
                    <Form.Group controlId='phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type='tel' placeholder='Please enter phone number' onChange={ (e) => setPhone(parseInt(e.target.value)) } value={ phone } />
                    </Form.Group>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text' placeholder='Please enter address' onChange={ (e) => setAddress(e.target.value) } value={ address } />
                    </Form.Group>
                    <Form.Group controlId='payment'>
                        <Form.Check type='radio' name='payment' id='payment-0' label='Credit card' onChange={ (e) => setPayment(e.target.checked ? 0 : null) } inline />
                        <Form.Check type='radio' name='payment' id='payment-1' label='PayPal' onChange={ (e) => setPayment(e.target.checked ? 1 : null) } inline />
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

export default UserCreateModal;
