import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CompleteBuyModal from './CompleteBuyModal';

function CompleteBuyBtn({ image }) {
    const [buy, setBuy] = useState({ success: false, detail: {} });
    const [show, setShow] = useState(false);

    const getBuy = async () => {
        try {
            // backend get buy
            await axios.get('http://localhost:8000/buy/image/' + image._id).then(async (buyRes) => {
                setBuy(buyRes.data);
            }).catch((buyErr) => {
                setBuy(buyErr.response.data);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    useEffect(() => {
        getBuy();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    console.log(buy);
    return (
        <>
            { buy.success === true && buy.detail.cancellation === false && buy.detail.completion === null && <>
                <Button variant='success' size='sm' onClick={ handleShow }>Shipped</Button>
                <CompleteBuyModal show={ show } handleHide={ handleHide } buy={ buy } />
            </>}
            { buy.success === true && buy.detail.cancellation === false && buy.detail.completion !== null &&
                <Button variant='secondary' size='sm' disabled>Completed</Button>
            }
        </>
    );
};

export default CompleteBuyBtn;
