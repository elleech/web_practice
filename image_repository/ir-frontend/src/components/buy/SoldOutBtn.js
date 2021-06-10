import React from 'react';
import Button from 'react-bootstrap/Button';

function SoldOutBtn() {
    return (
        <Button variant='secondary' size='sm' disabled>Sold Out</Button>
    );
};

export default SoldOutBtn;
