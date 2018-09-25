import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import { AppBar, TextField, RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { cardDetails } from '../../actions/cardDetails.actions.js';

class AtmDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            formErrors: { withdrawAmount: '' },

        };

    }

    isValid = () => {

        const { formErrors, amount } = this.state;
        let formErr = { withdrawAmount: '' };
        let valid = false;

        if (isNaN(amount)) {
            formErr.withdrawAmount = 'Amount number must be number ';
        } else if (amount % 100 != 0) {
            formErr.withdrawAmount = 'Amount must be of multiplication of 100. ';
        } else
            valid = true;
        this.setState({ formErrors: formErr });
        return valid;

    }
    handleClick() {
        if (this.isValid()) {
            const { amount } = this.state;
            this.props.dispatch(cardDetails.withdrawAmount(amount, this.props.id));
            this.setState({amount:''});
        }
    }

    render() {
        const { verified, error, session, transaction_success } = this.props;
        const { formErrors } = this.state;
        if (!session) {
            return (
                <Redirect to="/" />
            )
        } else if (transaction_success) {
            return (
                <Redirect to="/transaction" />
            )
        }
        else
            return (
                <React.Fragment>
                    <MuiThemeProvider>
                        <React.Fragment>
                            <AppBar
                                title="ATM"
                            />
                            {error ? <label>{error}</label> : null}
                            <form name="withdraw" style={{ margin: '0 auto' }} autoComplete="none" noValidate>
                                <TextField
                                    hintText="Enter withdraw amount"
                                    floatingLabelText="Card Number"
                                    onChange={(event, newValue) => this.setState({ amount: newValue })}
                                    errorText={formErrors.withdrawAmount}
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
    const { verified, error, id, session, transaction_success } = state.cards;
    return {
        verified,
        error,
        id,
        session,
        transaction_success
    };
}

export default connect(mapStateToProps)(AtmDetails);