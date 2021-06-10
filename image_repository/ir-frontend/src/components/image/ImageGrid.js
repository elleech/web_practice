import Moment from 'moment';
import React from 'react';
import { Card, CardColumns, Col, Row } from 'react-bootstrap';
import BuyBtn from '../buy/BuyBtn';
import CompleteBuyBtn from '../buy/CompleteBuyBtn';
import SoldOutBtn from '../buy/SoldOutBtn';
import ImageUpdateBtn from './ImageUpdateBtn';

function ImageGrid({ images, authData }) {
    const renderImageGrid = () => {
        return (
            <CardColumns>
                { images.detail.map((image, index) => {
                    if (authData.isLoggedIn === false) {
                        return (
                            <Card className='no-border' key={ index }>
                                <Card.Img src={ image.imageUrl } alt={ image.title } rounded='true' />
                            </Card>
                        );
                    } else {
                        return (
                            <Card className='no-border mb-5' key={ index }>
                                <Card.Img src={ image.imageUrl } alt={ image.title } rounded='true' />
                                <Card.Body>
                                    <div className='small text-muted text-right'>
                                        { Moment(image.date).format('YYYY-MM-DD') }
                                    </div>
                                    <Card.Title>{ image.title }</Card.Title>
                                    <Row className='align-items-end justify-content-between'>
                                        <Col>
                                            { image.stock === true ? <h6>${ image.price }</h6> : <h6 className='text-muted'><del>${ image.price }</del></h6> }
                                        </Col>
                                        <Col className='text-right'>
                                            { image.stock === true ? (
                                                image._ownerAccountId !== authData.accountId ? <BuyBtn image={ image } authData={ authData } /> : <ImageUpdateBtn image={ image } />
                                            ) : (
                                                image._ownerAccountId !== authData.accountId ? <SoldOutBtn /> : <CompleteBuyBtn image={image} />
                                            ) }
                                            { authData.isAdmin === true && 'update' }
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        );
                    }
                }) }
            </CardColumns>
        );
    };

    return renderImageGrid();
};

export default ImageGrid;
