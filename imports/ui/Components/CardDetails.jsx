import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import { AppBar, TextField, RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { cardDetails } from '../../actions/cardDetails.actions.js';

class CardDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '',
            atmPin: '',
            formErrors: { cardError: '', atmError: '' },
            cardValid: false,
            pinValid: false,
            formValid: false

        };

    }

    isValid = () => {

        const { formErrors, cardnumber, atmPin } = this.state;
        let formErr = { cardError: '', atmError: '' };
        let valid = true;

        if (isNaN(cardnumber)) {
            valid = false;
            formErr.cardError = 'Card number must be number ';
        } else if (cardnumber.length != 16) {
            valid = false;
            formErr.cardError = 'Card number must be of 16 digits ';
        }

        if (isNaN(atmPin)) {
            valid = false;
            formErr.atmError = 'Pin must be number ';
        } else if (atmPin.length != 4) {
            valid = false;
            formErr.atmError = 'Pin must be of 4  digits ';
        }
        this.setState({ formErrors: formErr });
        return valid;

    }
    handleClick() {
        if (this.isValid()) {
            const { cardnumber, atmPin } = this.state;
            this.props.dispatch(cardDetails.verifyCardDetails(cardnumber, atmPin));
        }
    }

    render() {
        const { verified, error } = this.props;
        const { formErrors } = this.state;
        if (verified)
            return (
                <Redirect to="/withdraw" />
            )
        else
            return (
                <React.Fragment>
                    <MuiThemeProvider>
                        <React.Fragment>
                            <AppBar
                                title="ATM"
                            />
                            {error ? <label>{error}</label> : null}
                            <form name="cardDetails" style={{ margin: '0 auto' }} autoComplete="none" noValidate>
                                <TextField
                                    hintText="Enter your card number"
                                    floatingLabelText="Card Number"
                                    onChange={(event, newValue) => this.setState({ cardnumber: newValue })}
                                    errorText={formErrors.cardError}
                                />
                                <br />
                                <TextField
                                    type="password"
                                    hintText="Enter pin number"
                                    floatingLabelText="Pin Number"
                                    onChange={(event, newValue) => this.setState({ atmPin: newValue })}
                                    errorText={formErrors.atmError}
                                />
                                <br />
                                <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)} />
                            </form>
                        </React.Fragment>
                    </MuiThemeProvider>
                </React.Fragment>

            );
    }
}


const mapStateToProps = (state) => {
    const { verified, error } = state.cards;
    return {
        verified,
        error
    };
}

export default connect(mapStateToProps)(CardDetails);