import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import LoginModal from './LoginModal';

function LoginBtn() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <Nav.Link href='' onClick={ handleShow }>Login</Nav.Link>
            <LoginModal show={ show } handleHide={ handleHide } />
        </>
    );
};

export default LoginBtn;
