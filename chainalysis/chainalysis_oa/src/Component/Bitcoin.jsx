import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Price from './Price';

class Bitcoin extends React.Component {
    render() {
        return (
            <Col sm={6}>
                <h2>
                    <FontAwesomeIcon icon={['fab', 'btc']} style={{ color: '#FFC42E' }} /> Bitcoin <FontAwesomeIcon icon={['fab', 'btc']} style={{ color: '#FFC42E' }} />
                </h2>
                <Price cryptocurrency={ 'bitcoin' } />
            </Col>
        )
    }
}

export default Bitcoin;