import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing } from './components/layout/Landing';
import Login from './components/auth/login';
import Register from './components/auth/register';
import AddCourse from './components/addCourse/AddCourse';
import PrivateRoute from './components/Routing/PrivateRoute';
import CoursePage from './pages/CoursePage';
import CoursesPage from './pages/CoursesPage';
import Alert from './components/alert/alert.component';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
//redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/'>
                        <Landing></Landing>
                        <div className='container'>
                            <CoursesPage></CoursesPage>
                        </div>
                    </Route>
                    <div className='container'>
                        <Alert />

                        <Switch>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route
                                exact
                                path='/courses'
                                component={CoursesPage}
                            />
                            <Route
                                exact
                                path='/course/:slang'
                                component={CoursePage}
                            />
                            <Route exact path='/login' component={Login} />

                            <PrivateRoute
                                exact
                                path='/new-course'
                                component={AddCourse}
                            />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
