import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CancelBuyModal from './CancelBuyModal';

function CancelBuyBtn({ order }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            { order.cancellation === true ? (
                <>
                    <Button variant='secondary' size='sm' disabled>Cancelled</Button>
                    <p className='small text-muted'>You've cancelled the order.</p>
                </>
            ) : order.completion !== null ? (
                <>
                    <Button variant='secondary' size='sm' disabled>Shipped</Button>
                    <p className='small text-muted'>Cannot be cancelled.</p>
                </>
            ) : (
                <>
                    <Button variant='danger' size='sm' onClick={ handleShow }>Cancel</Button>
                    <CancelBuyModal show={ show } handleHide={ handleHide } order={ order } />
                </>
            ) }
        </>
    );
};

export default CancelBuyBtn;
