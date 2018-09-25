import meteor from 'meteor/meteor';
import mongo from 'meteor/mongo';

export const atm = new Mongo.Collection('atm');

if (Meteor.isServer) {
    Meteor.publish('atm.all', function atmPublication() {
        return atm.find();
    });
}

Meteor.methods({

    'atm.update'(denomination) {
        let atmDetails = atm.findOne({ currency_denomination: "2000" });
        atm.update({ _id: atmDetails._id }, {
            $set: {
                count: (parseInt(atmDetails.count) - parseInt(denomination[2000]))
            }
        });
        let atmDetails1 = atm.findOne({ currency_denomination: "500" });
        atm.update({ currency_denomination: "500" }, {
            $set: {
                count: (parseInt(atmDetails1.count) - parseInt(denomination[500]))
            }
        });
        let atmDetails2 = atm.findOne({ currency_denomination: "100" });
        atm.update({ currency_denomination: "100" }, {
            $set: {
                count: (parseInt(atmDetails2.count) - parseInt(denomination[100]))
            }
        })
    },
})