import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import MyOrder from './components/buy/MyOrder';
import MyImage from './components/image/MyImage';
import Repository from './components/image/Repository';
import Navigation from './components/layout/Navigation';
import MyAccount from './components/user/MyAccount';

function Router() {
    const { authData } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route exact path='/'><Repository /></Route>
                { authData.isLoggedIn === true && (
                    <>
                        <Route path='/my_image'><MyImage /></Route>
                        <Route path='/my_account'><MyAccount /></Route>
                        <Route path='/my_order'><MyOrder /></Route>
                    </>
                ) }
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
