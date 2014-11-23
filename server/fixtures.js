if (Drinks.find().count() === 0) {  var now = new Date().getTime();  //create two users  var bobId = Meteor.users.insert({    profile: { name: 'Bob Smith' }  });  var bob = Meteor.users.findOne(bobId);  var daveId = Meteor.users.insert({    profile: { name: 'Dave Jones' }  });  var dave = Meteor.users.findOne(daveId);  //create a drink and give it two comments  var vodkaSodaId = Drinks.insert({    drinkName: 'Vodka & Soda',    drinkIngredients: 'vodka, soda',    userId: dave._id,    author: dave.profile.name,    submitted: new Date(now - 7 * 3600 * 1000),    commentsCount: 2  });  Comments.insert({    drinkId: vodkaSodaId,    userId: bob._id,    author: bob.profile.name,    submitted: new Date(now - 5 * 3600 * 1000),    body: 'This drink has two of my favorite ingredients.'  });  Comments.insert({    drinkId: vodkaSodaId,    userId: dave._id,    author: dave.profile.name,    submitted: new Date(now - 3 * 3600 * 1000),    body: 'I know, right?? Simple, but so good.',    commentsCount: 0  });  //create two more drinks  Drinks.insert({    drinkName: 'Rum & Coke',    drinkIngredients: 'rum, coke',    userId: bob._id,    author: bob.profile.name,    submitted: new Date(now - 10 * 3600 * 1000),    commentsCount: 0  });  Drinks.insert({    drinkName: 'Martini',    drinkIngredients: 'gin, vermouth',    userId: dave._id,    author: dave.profile.name,    submitted: new Date(now - 12 * 3600 * 1000),    commentsCount: 0  });  //create 30 more drinks  for (var i = 4; i <= 33; i++) {    Drinks.insert({      drinkName: 'Test Drink #' + i,      drinkIngredients: 'some ingredients for test drink #' + i,      userId: dave._id,      author: dave.profile.name,      submitted: new Date(now - (20 + i) * 3600 * 1000),      commentsCount: 0    });  }}