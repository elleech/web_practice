import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AccountUpdateModal from './AccountUpdateModal';

function AccountUpdateBtn({ account }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <Button variant='info' size='sm' onClick={ handleShow }>Update</Button>
            <AccountUpdateModal show={ show } handleHide={ handleHide } account={ account } />
        </>
    );
};

export default AccountUpdateBtn;
