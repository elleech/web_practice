import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import UserCreateModal from './UserCreateModal';

function UserCreateBtn() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <Button variant='primary' size='sm' onClick={ handleShow }>Create</Button>
            <UserCreateModal show={ show } handleHide={ handleHide } />
        </>
    );
};

export default UserCreateBtn;
