import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import BuyModal from './BuyModal';

function BuyBtn({ image, authData }) {
    const [user, setUser] = useState({ success: false, detail: {} });
    const [show, setShow] = useState(false);

    const getUser = async () => {
        try {
            // backend get user
            await axios.get('http://localhost:8000/user/' + authData.accountId).then(async (userRes) => {
                setUser(userRes.data);
            }).catch((userErr) => {
                setUser(userErr.response.data);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    useEffect(() => {
        getUser();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    console.log(user);
    return (
        <>
            { user.success === true && <>
                <Button variant='warning' size='sm' onClick={ handleShow }>Buy</Button>
                <BuyModal show={ show } handleHide={ handleHide } image={ image } />
            </> }
            { user.success === false &&
                <OverlayTrigger overlay={ <Tooltip id="tooltip-disabled">Please update your shipping info @My Account</Tooltip> }>
                    <span className="d-inline-block">
                        <Button variant='dark' size='sm' disabled style={{ pointerEvents: 'none' }}>Buy</Button>
                    </span>
                </OverlayTrigger>
            }
        </>
    );
};

export default BuyBtn;
