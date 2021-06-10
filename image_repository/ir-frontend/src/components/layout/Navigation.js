import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';
import LoginBtn from '../account/LoginBtn';
import LogoutBtn from '../account/LogoutBtn';
import RegisterBtn from '../account/RegisterBtn';

function Navigation() {
    const { authData } = useContext(AuthContext);

    return (
        <Navbar expand='lg'>
            <Navbar.Brand href='/'>Image Repository</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                { authData.isLoggedIn === true && (
                    <>
                        <Nav className='mr-auto'>
                            <Nav.Link href='/my_image'>My Image</Nav.Link>
                            <Nav.Link href='/my_account'>My Account</Nav.Link>
                            <Nav.Link href='/my_order'>My Order</Nav.Link>
                            { authData.isAdmin === true && <Nav.Link href='/admin'>Admin</Nav.Link> }
                        </Nav>
                        <Nav className='ml-auto'>
                            <LogoutBtn />
                        </Nav>
                    </>
                ) }
                { authData.isLoggedIn === false && (
                    <Nav className='ml-auto'>
                        <Nav.Item><RegisterBtn /></Nav.Item>
                        <Nav.Item><LoginBtn /></Nav.Item>
                    </Nav>
                ) }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
