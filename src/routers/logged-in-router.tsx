import React from 'react';
import { 
    BrowserRouter as Router, 
    Redirect, 
    Route, 
    Switch 
} from 'react-router-dom'; // BrowserRouter를 Router로 renaming해서 추가
import { UserRole } from '../__generated__/globalTypes';
import { Restaurants } from '../pages/client/restaurants';
import { Header } from "../components/header";
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';

const ClientRoutes = [
    <Route path="/" key={1} exact>
        <Restaurants/>
    </Route>,
    <Route path="/confirm" key={2} exact>
        <ConfirmEmail />
    </Route>,
    <Route path="/edit-profile" key={3} exact>
        <EditProfile />
    </Route>,
];

export const LoggedInRouter = () => {
    const { data, loading, error } = useMe();
    if(!data || loading || error) {
        return <div className="h-screen flex justify-center items-center font-semibold text-xl tracking-wide">Loading ...</div>
    }
    return (
        <Router>
            <Header />
            <Switch>
                {data.me.role === UserRole.Client && ClientRoutes}
                {/* <Redirect to="/"/> */}
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}