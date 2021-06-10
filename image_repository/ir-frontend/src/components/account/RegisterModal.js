import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function RegisterModal({ show, handleHide }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { getAuthData } = useContext(AuthContext);
    const history = useHistory();

    const register = async (e) => {
        e.preventDefault();
        try {
            // backend register
            const registerData = { email, username, password, passwordVerify, isAdmin };
            await axios.post('http://localhost:8000/register', registerData);
            // frontend login
            await getAuthData();

            // go back to home page
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal show={ show } onHide={ handleHide } backdrop='static' centered>
            <Modal.Header>
                <Modal.Title>Register a new account</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ register }>
                <Modal.Body>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='text' placeholder='Please enter email' onChange={ (e) => setEmail(e.target.value) } value={ email } />
                    </Form.Group>
                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' placeholder='Please enter username' onChange={ (e) => setUsername(e.target.value) } value={ username } />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Please enter password' onChange={ (e) => setPassword(e.target.value) } value={ password } />
                    </Form.Group>
                    <Form.Group controlId='passwordVerify'>
                        <Form.Label>Verify your password</Form.Label>
                        <Form.Control type='password' placeholder='Please verify the password again' onChange={ (e) => setPasswordVerify(e.target.value) } value={ passwordVerify } />
                    </Form.Group>
                    {/* <Form.Group controlId='isAdmin'>
                        <Form.Check type='checkbox' label='Admin?' onChange={ (e) => setIsAdmin(e.target.checked) } value={ isAdmin } />
                    </Form.Group> */}
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button type='button' variant="dark" onClick={ handleHide }>Cancel</Button>
                    <Button type='submit' variant="success" onClick={ handleHide }>Register</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default RegisterModal;
