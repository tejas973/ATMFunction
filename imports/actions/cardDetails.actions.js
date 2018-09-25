import meteor from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { cards } from '../api/cardDetails';
import { atm } from '../api/atmDetails';
import { transaction } from '../api/transaction';
const CARD_VERIFY_REQUEST = 'CARD_VERIFY_REQUEST';
const CARD_VERIFY_SUCCESS = 'CARD_VERIFY_SUCCESS';
const CARD_VERIFY_FAILURE = 'CARD_VERIFY_FAILURE';
const SESSION_EXPIRED = 'SESSION_EXPIRED';
const TRANSACTION_REQUEST = 'TRANSACTION_REQUEST';
const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';

verifyCardDetails = (cardNumber, atmPin) => {
    return (dispatch) => {
        dispatch(request());
        const handle = Meteor.subscribe('cards.verifyCard', cardNumber, atmPin);
        Tracker.autorun(function () {
            if (handle.ready()) {
                const card = cards.findOne({ cardNumber: cardNumber, atmPin: atmPin });
                if (card)
                    dispatch(success(card._id));
                else
                    dispatch(failure("Invalid Card details."));
            }
        });
    }
    function request() {
        return { type: CARD_VERIFY_REQUEST }
    }
    function success(id) {
        return { type: CARD_VERIFY_SUCCESS, id }
    }
    function failure(error) {
        return { type: CARD_VERIFY_FAILURE, error }
    }
}

withdrawAmount = (amount, id) => {
    return (dispatch) => {
        dispatch(request());
        const handle = Meteor.subscribe('cards.verifyCard');
        const handle2 = Meteor.subscribe('atm.all');
        Tracker.autorun(function () {
            if (handle.ready()) {
                const cardId = cards.findOne({ _id: id });
                if (cardId) {
                    if (parseInt(cardId.balance) >= parseInt(amount)) {
                        if (handle2.ready()) {
                            let atmdetails = atm.find().fetch();
                            let total = 0;
                            let denomination = {};
                            atmdetails.map((atmAmount) => {
                                total += parseInt(atmAmount.currency_denomination) * parseInt(atmAmount.count);
                            })
                            if (parseInt(total) >= parseInt(amount)) {
                                denomination = {
                                    2000: Math.floor(parseInt(amount) / 2000),
                                    500: Math.floor((parseInt(amount) % 2000) / 500),
                                    100: Math.floor(((parseInt(amount) % 2000) % 500) / 100),
                                    remainingBalance: (parseInt(cardId.balance) - parseInt(amount))
                                }
                                Meteor.call('atm.update', denomination);
                                Meteor.call('cards.update', id, amount);
                                Meteor.call('transaction.insert', id, amount);
                                dispatch(success(denomination));
                            }
                            else {
                                dispatch(failure("Insufficient amount."));
                            }
                        }
                    }
                    else {
                        dispatch(failure("Insufficient balance."));
                    }
                } else {
                    dispatch(failureSession("session expired please try again."));
                }
            }
        });
    }
    function request() {
        return { type: TRANSACTION_REQUEST }
    }
    function success(payload) {
        return { type: TRANSACTION_SUCCESS, payload }
    }
    function failure(error) {
        return { type: CARD_VERIFY_FAILURE, error }
    }
    function failureSession(error) {
        return { type: SESSION_EXPIRED, error }
    }
}




export const cardDetails = {
    verifyCardDetails,
    withdrawAmount
}