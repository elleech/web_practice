import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ImageUpdateModal from './ImageUpdateModal';

function ImageUpdateBtn({ image }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            { image.stock === true ? <Button variant='info' size='sm' onClick={ handleShow }>Update</Button> : <Button variant='secondary' size='sm' disabled>Update</Button>}
            <ImageUpdateModal show={ show } handleHide={ handleHide } image={ image } />
        </>
    );
};

export default ImageUpdateBtn;
