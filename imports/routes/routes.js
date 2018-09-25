import React from 'react';
import { Router, Route, IndexRoute, Switch } from 'react-router';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Provider } from "react-redux";
import configureStore from '../store/configureStore';
import CardDetails from '../ui/Components/CardDetails.jsx';
import AtmDetails from '../ui/Components/AtmDetails.jsx';
import Transaction from '../ui/Components/Transaction.jsx'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

const { store } = configureStore();
const history = createBrowserHistory();
const muiTheme = getMuiTheme({
    fontFamily: 'Quicksand, sans-serif',
    palette: {
        textColor: '#000',
        primary1Color: '#008080',
    },
    appBar: {
        height: 50,
    },
});

export const renderRoutes = () => (
    <Provider store={store}>
        <Router history={history}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <React.Fragment>
                    <Switch>
                        <Route exact path="/transaction" component={Transaction} />
                        <Route exact path="/withdraw" component={AtmDetails} />
                        <Route path="/" component={CardDetails} />
                    </Switch>
                </React.Fragment>
            </MuiThemeProvider>
        </Router>
    </Provider >
);