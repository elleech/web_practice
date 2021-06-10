import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [authData, setAuthData] = useState({ isLoggedIn: false, isAdmin: false, accountId: null });

    async function getAuthData() {
        const authDataRes = await axios.get('http://localhost:8000/auth');
        setAuthData(authDataRes.data);
    };

    useEffect(() => {
        getAuthData();
    }, []);

    return (
        <AuthContext.Provider value={{ authData, getAuthData }}>
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthContext;
export { AuthContextProvider };
