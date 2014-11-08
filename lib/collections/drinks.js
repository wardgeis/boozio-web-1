Drinks = new Mongo.Collection('drinks');

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
