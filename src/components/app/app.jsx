import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import AppHeader from '../app-header/app-header';

import styles from './app.module.css';

const App = () => (
    <div className={styles.wrapper}>
        <AppHeader />
        <Router>
            <Switch>
                {/* <Route path="/login" component={} />
                <Route path="/register" component={} />
                <Route path="/forgot-password" component={} />
                <Route path="/reset-password" component={} />
                <Route path="/feed" component={} />
                <Route path="/feed/:id" component={} />
                <Route path="/profile" component={} />
                <Route path="/profile/orders" component={} />
                <Route path="/profile/orders/:id" component={} />
                <Route path="/ingredients/:id" component={} /> */}
                <Route path="/" component={MainPage} exact />
                <Route>
                    <div>
                        404
                    </div>
                </Route>
            </Switch>
        </Router>
    </div>
);

export default App;
