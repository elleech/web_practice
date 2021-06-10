import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import UserUpdateModal from './UserUpdateModal';

function UserUpdateBtn({ account, user }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <Button variant='info' size='sm' onClick={ handleShow }>Update</Button>
            <UserUpdateModal show={ show } handleHide={ handleHide } account={ account } user={ user } />
        </>
    );
};

export default UserUpdateBtn;
