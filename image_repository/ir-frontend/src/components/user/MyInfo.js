import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AccountUpdateBtn from './AccountUpdateBtn';
import UserCreateBtn from './UserCreateBtn';
import UserUpdateBtn from './UserUpdateBtn';

function MyInfo({ account, user }) {
    const renderMyInfo = () => {
        return (
            <>
            <Row>
                <Col xs='auto'>
                    <h3>Your registration info</h3>
                </Col>
                <Col>
                    <AccountUpdateBtn account={ account } />
                </Col>
            </Row>
            <Row>
                <Col>
                    Username: { account.detail.username }
                </Col>
            </Row>
            <Row>
                <Col>
                    Email: { account.detail.email }
                </Col>
            </Row>
            <hr />
            <Row>
                <Col xs='auto'>
                    <h3>Your shipping info</h3>
                </Col>
                <Col>
                    { user.success === true ? <UserUpdateBtn account={ account } user={ user } /> : <UserCreateBtn /> }
                </Col>
            </Row>
            { user.success === true && (
                <>
                    <Row>
                        <Col>
                            Name: { user.detail.firstname } { user.detail.lastname }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Phone Number: { user.detail.phone }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Address: { user.detail.address }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Payment Method: { user.detail.payment === 0 ? 'Credit Card' : 'PayPal' }
                        </Col>
                    </Row>
                </>
            ) }
            { user.success === false && (
                <Row>
                    <Col>
                        &#62;&#62; No data. Please create your shipping info.
                    </Col>
                </Row>
            ) }
            </>
        );
    };

    return renderMyInfo();
};

export default MyInfo;
