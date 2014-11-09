Drinks = new Mongo.Collection('drinks');

Drinks.allow({
  update: function(userId, drink) { return ownsDocument(userId, drink); },
  remove: function(userId, drink) { return ownsDocument(userId, drink); }
});

Drinks.deny({
  update: function(userId, drink, fieldNames) {
    //only allow editing these fields:
    return (_.without(fieldNames, 'drinkName', 'drinkIngredients').length > 0);
  }
});

Meteor.methods({
  drinkInsert: function(drinkAttributes) {
    check(Meteor.userId(), String);
    check(drinkAttributes, {
      drinkName: String,
      drinkIngredients: String
    });

    var drinkWithSameName = Drinks.findOne({drinkName: drinkAttributes.drinkName});
    if (drinkWithSameName) {
      return {
        drinkExists: true,
        _id: drinkWithSameName._id
      }
    }


    var user = Meteor.user();
    var drink = _.extend(drinkAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var drinkId = Drinks.insert(drink);

    return {
      _id: drinkId
    };
  }
});
