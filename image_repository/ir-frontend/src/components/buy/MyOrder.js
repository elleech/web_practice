import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';
import OrderTable from './OrderTable';

function MyOrder() {
    const [orders, setOrders] = useState({ success: false, detail: [] });

    const { authData } = useContext(AuthContext);

    const getMyOrders = async () => {
        try {
            // get token-stored account id
            const accountId = authData.accountId;

            // backend get buy by buyer account id
            await axios.get('http://localhost:8000/buy/buyer/' + accountId).then((buysRes) => {
                const buys = buysRes.data;
                const ordersDetail = new Array();
                if (buys.success === true) {
                    buys.detail.forEach(async (buy) => {
                        // backend get image by image id
                        await axios.get('http://localhost:8000/image/' + buy._imageId).then((imageRes) => {
                            let image = imageRes.data.detail;
                            ordersDetail.push({
                                _id: buy._id,
                                _imageId: buy._imageId,
                                _buyerAccountId: buy._buyerAccountId,
                                _ownerAccountId: image._ownerAccountId,
                                title: image.title,
                                imageUrl: image.imageUrl,
                                price: image.price,
                                transaction: buy.transaction,
                                cancellation: buy.cancellation,
                                completion: buy.completion
                            });
                            setOrders({ success: true, detail: orders.detail.concat(ordersDetail) });
                        }).catch((imageErr) => {
                            console.log(imageErr.response.data);
                            ordersDetail.push({
                                _id: buy._id,
                                _imageId: buy._imageId,
                                _buyerAccountId: buy._buyerAccountId,
                                _ownerAccountId: '',
                                title: '',
                                imageUrl: '',
                                price: '',
                                transaction: buy.transaction,
                                cancellation: buy.cancellation,
                                completion: buy.completion
                            });
                            setOrders({ success: true, detail: orders.detail.concat(ordersDetail) });
                        });
                    });
                }
            }).catch((buysErr) => {
                console.log(buysErr.response.data);
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMyOrders();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container className='mb-5'>
            { orders.success === true && <OrderTable orders={ orders } /> }
            { orders.success === false && <Row><Col>&#62;&#62; No purchase records.</Col></Row> }
        </Container>
    );
};

export default MyOrder;
