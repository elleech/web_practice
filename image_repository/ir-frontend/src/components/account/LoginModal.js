import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function LoginModal({ show, handleHide }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { getAuthData } = useContext(AuthContext);
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
        try {
            // backend login
            const loginData = { username, password };
            await axios.post('http://localhost:8000/login', loginData);
            // frontend login
            await getAuthData();

            // go back to home page
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal show={ show } onHide={ handleHide } centered>
            <Modal.Header>
                <Modal.Title>Login to your account</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ login }>
                <Modal.Body>
                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' placeholder='Please enter username' onChange={ (e) => setUsername(e.target.value) } value={ username } />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Please enter password' onChange={ (e) => setPassword(e.target.value) } value={ password } />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button type='button' variant="secondary" onClick={ handleHide }>Cancel</Button>
                    <Button type='submit' variant="primary" onClick={ handleHide }>Login</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default LoginModal;
