import meteor from 'meteor/meteor';
import mongo from 'meteor/mongo';

export const transaction = new Mongo.Collection('transaction');

if (Meteor.isServer) {
    Meteor.publish('transaction.all', function atmPublication() {
        return transaction.find();
    });
}

Meteor.methods({
    'transaction.insert'(id, amount) {
        transaction.insert({
            cardId: id,
            amount: amount
        });
    }
})