import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import RegisterModal from './RegisterModal';

function RegisterBtn() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <Nav.Link href='' onClick={ handleShow }>Register</Nav.Link>
            <RegisterModal show={ show } handleHide={ handleHide } />
        </>
    );
};

export default RegisterBtn;
