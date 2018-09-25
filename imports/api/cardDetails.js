import meteor from 'meteor/meteor';
import mongo from 'meteor/mongo';

export const cards = new Mongo.Collection('cards');

if (Meteor.isServer) {
    Meteor.publish('cards.verifyCard', function cardPublication(cardNumber, atmPin) {
        return cards.find();
    });
}

Meteor.methods({
    'cards.update'(id, amount) {
        let cardDetails = cards.findOne(id);
        cards.update(id, {
            $set: {
                balance: parseInt(cardDetails.balance) - parseInt(amount)
            }
        });
    },
})