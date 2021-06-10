import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function UserUpdateModal({ show, handleHide, account, user }) {
    const [newFirstname, setNewFirstname] = useState('');
    const [newLastname, setNewLastname] = useState('');
    const [newPayment, setNewPayment] = useState(user.detail.payment);
    const [newPhone, setNewPhone] = useState();
    const [newAddress, setNewAddress] = useState('');

    const { authData } = useContext(AuthContext);
    const history = useHistory();

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            // get token-stored account id
            const accountId = authData.accountId;

            // backend update user
            const updateUserData = { newFirstname, newLastname, newPayment, newPhone, newAddress };
            await axios.put('http://localhost:8000/user/' + accountId, updateUserData);

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
                <Modal.Title>Update your shipping info</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ updateUser }>
                <Modal.Body>
                    <Form.Group controlId='firstname'>
                        <Form.Label>Change first name?</Form.Label>
                        <Form.Control type='text' placeholder={ user.detail.firstname } onChange={ (e) => setNewFirstname(e.target.value) } value={ newFirstname } />
                    </Form.Group>
                    <Form.Group controlId='lastname'>
                        <Form.Label>Change last name?</Form.Label>
                        <Form.Control type='text' placeholder={ user.detail.lastname } onChange={ (e) => setNewLastname(e.target.value) } value={ newLastname } />
                    </Form.Group>
                    <Form.Group controlId='phone'>
                        <Form.Label>Change phone?</Form.Label>
                        <Form.Control type='tel' placeholder={ user.detail.phone } onChange={ (e) => setNewPhone(parseInt(e.target.value)) } value={ newPhone } />
                    </Form.Group>
                    <Form.Group controlId='address'>
                        <Form.Label>Change address?</Form.Label>
                        <Form.Control type='text' placeholder={ user.detail.address } onChange={ (e) => setNewAddress(e.target.value) } value={ newAddress } />
                    </Form.Group>
                    <Form.Group controlId='payment'>
                        <Form.Check type='radio' name='payment' id='payment-0' label='Credit card' onChange={ (e) => setNewPayment(e.target.checked ? 0 : null) } checked={ newPayment === 0 ? 'checked' : '' } inline />
                        <Form.Check type='radio' name='payment' id='payment-1' label='PayPal' onChange={ (e) => setNewPayment(e.target.checked ? 1 : null) } checked={ newPayment === 1 ? 'checked' : '' } inline />
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

export default UserUpdateModal;
