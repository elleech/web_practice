import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';
import ImageGrid from './ImageGrid';

function Repository() {
    const [images, setImages] = useState({ success: false, detail: [] });

    const { authData } = useContext(AuthContext);

    const getImages = async () => {
        try {
            await axios.get('http://localhost:8000/image/').then((imagesRes) => {
                setImages(imagesRes.data);
            }).catch((imagesErr) => {
                setImages(imagesErr.response.data);
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getImages();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container className='mb-5'>
            { images.success === true && <ImageGrid images={ images } authData={ authData } /> }
            { images.success === false && <Row><Col>&#62;&#62; No images in repository.</Col></Row> }
        </Container>
    );
};

export default Repository;
