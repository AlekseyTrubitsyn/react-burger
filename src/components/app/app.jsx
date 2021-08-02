import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import RegisterPage from '../../pages/register-page/register-page';
import LoginPage from '../../pages/login-page/login-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';

import styles from './app.module.css';

const App = () => (
    <div>
        <AppHeader />
        <div className={styles.wrapper}>
            <Router>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/forgot-password" component={ForgotPasswordPage} />
                    <Route path="/reset-password" component={ResetPasswordPage} />
                    {/*<Route path="/feed" component={} />
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
    </div>
);

export default App;
