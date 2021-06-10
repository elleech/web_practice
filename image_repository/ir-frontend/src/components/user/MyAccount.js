import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import AuthContext from '../../context/AuthContext';
import MyInfo from './MyInfo';

function MyAccount() {
    const [account, setAccount] = useState([]);
    const [user, setUser] = useState([]);

    const { authData } = useContext(AuthContext);

    const getMyInfo = async () => {
        try {
            // get token-stored account id
            const accountId = authData.accountId;

            // backend get account & user
            await axios.get('http://localhost:8000/account/' + accountId).then((accountRes) => {
                setAccount(accountRes.data);
            }).catch((accountErr) => {
                setAccount(accountErr.response.data);
            });
            await axios.get('http://localhost:8000/user/' + accountId).then((userRes) => {
                setUser(userRes.data);
            }).catch((userErr) => {
                setUser(userErr.response.data);
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMyInfo();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            { account.success === true && <MyInfo account={ account } user={ user } /> }
        </Container>
    );
};

export default MyAccount;
