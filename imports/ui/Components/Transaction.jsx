import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import { AppBar, TextField, RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { cardDetails } from '../../actions/cardDetails.actions.js';

class Transaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }



    render() {
        const { verified, error, session, transaction_success, payload } = this.props;
        const { formErrors } = this.state;
        console.log(payload.remainingBalance);
        return (
            <React.Fragment>
                <MuiThemeProvider>
                    <React.Fragment>
                        <AppBar
                            title="ATM"
                        />
                        <pre>
                            New Balance: {payload.remainingBalance}<br />
                            Notes:<br />
                            2000 * {payload[2000]}<br />
                            500 * {payload[500]}<br />
                            100 * {payload[100]}<br />
                        </pre>


                    </React.Fragment>
                </MuiThemeProvider>
            </React.Fragment>

        );
    }
}


const mapStateToProps = (state) => {
    const { verified, error, id, session, transaction_success, payload } = state.cards;
    return {
        verified,
        error,
        id,
        session,
        transaction_success,
        payload
    };
}

export default connect(mapStateToProps)(Transaction);