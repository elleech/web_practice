import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Price from './Price';

class Ethereum extends React.Component {
    render() {
        return (
            <Col sm={6}>
            <h2>
            <FontAwesomeIcon icon={['fab', 'ethereum']} style={{ color: '#B026FF' }} /> Ethereum <FontAwesomeIcon icon={['fab', 'ethereum']} style={{ color: '#B026FF' }} />
            </h2>
            <Price cryptocurrency={ 'ethereum' } />
        </Col>
        )
    }
}

export default Ethereum;