import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';
import ImageCreateBtn from './ImageCreateBtn';
import ImageGrid from './ImageGrid';

function MyImage() {
    const [images, setImages] = useState({ success: false, detail: [] });

    const { authData } = useContext(AuthContext);

    const getMyImages = async () => {
        try {
            // get token-stored account id
            const accountId = authData.accountId;

            // backend get image by owner account id
            await axios.get('http://localhost:8000/image/owner/' + accountId).then((imagesRes) => {
                setImages(imagesRes.data);
            }).catch((imagesErr) => {
                setImages(imagesErr.response.data);
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMyImages();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Container className='mb-3'>
                <Row>
                    <Col><ImageCreateBtn /></Col>
                </Row>
            </Container>
            <Container className='mb-5'>
                { images.success === true && <ImageGrid images={ images } authData={ authData } /> }
                { images.success === false && <Row><Col>&#62;&#62; You don't have images.</Col></Row> }
            </Container>
        </>
    );
};

export default MyImage;
