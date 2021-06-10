import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ImageCreateModal from './ImageCreateModal';

function ImageCreateBtn() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <Button variant='primary' size='sm' onClick={ handleShow }>Create</Button>
            <ImageCreateModal show={ show } handleHide={ handleHide } />
        </>
    );
};

export default ImageCreateBtn;
