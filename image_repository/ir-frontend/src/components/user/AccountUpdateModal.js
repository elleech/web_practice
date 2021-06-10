import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function AccountUpdateModal({ show, handleHide, account }) {
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordVerify, setNewPasswordVerify] = useState('');
    const [newIsAdmin, setNewIsAdmin] = useState(account.detail.isAdmin);

    const { authData } = useContext(AuthContext);
    const history = useHistory();

    const updateAccount = async (e) => {
        e.preventDefault();
        try {
            // get token-stored account id
            const accountId = authData.accountId;

            // backend update account
            const updateAccountData = { newEmail, newUsername, newPassword, newPasswordVerify, newIsAdmin };
            await axios.put('http://localhost:8000/account/' + accountId, updateAccountData);

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
                <Modal.Title>Update your account info</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ updateAccount }>
                <Modal.Body>
                    <Form.Group controlId='email'>
                        <Form.Label>Change email?</Form.Label>
                        <Form.Control type='text' placeholder={ account.detail.email } onChange={ (e) => setNewEmail(e.target.value) } value={ newEmail } />
                    </Form.Group>
                    <Form.Group controlId='username'>
                        <Form.Label>Change username?</Form.Label>
                        <Form.Control type='text' placeholder={ account.detail.username } onChange={ (e) => setNewUsername(e.target.value) } value={ newUsername } />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Change password?</Form.Label>
                        <Form.Control type='password' placeholder='Please enter new password' onChange={ (e) => setNewPassword(e.target.value) } value={ newPassword } />
                    </Form.Group>
                    <Form.Group controlId='passwordVerify'>
                        <Form.Label>Verify your changed password</Form.Label>
                        <Form.Control type='password' placeholder='Please verify the password again' onChange={ (e) => setNewPasswordVerify(e.target.value) } value={ newPasswordVerify } />
                    </Form.Group>
                    { account.detail.isAdmin === true && (
                        <Form.Group controlId='isAdmin'>
                            <Form.Check type='checkbox' name='isAdmin' label='Admin?' onChange={ (e) => setNewIsAdmin(e.target.checked) } defaultChecked />
                        </Form.Group>
                    ) }
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button type='button' variant="dark" onClick={ handleHide }>Cancel</Button>
                    <Button type='submit' variant="success" onClick={ handleHide }>Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AccountUpdateModal;
