import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';

const App = () => (
    <Router>
        <Switch>
            <Route path="/">
                <MainPage />
            </Route>
        </Switch>
    </Router>
);

export default App;
