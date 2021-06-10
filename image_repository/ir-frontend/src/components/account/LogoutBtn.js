import axios from 'axios';
import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function LogoutBtn() {
    const { getAuthData } = useContext(AuthContext);
    const history = useHistory();

    const logout = async (e) => {
        e.preventDefault();
        try {
            // backend logout
            await axios.get('http://localhost:8000/logout');
            // frontend logout
            await getAuthData();
    
            // go back to home page
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Nav.Link href='' onClick={ logout }>Logout</Nav.Link>
    );
};

export default LogoutBtn;
