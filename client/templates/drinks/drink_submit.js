Template.drinkSubmit.events({  'submit form': function(e) {    e.preventDefault();    var drink = {      drinkName: $(e.target).find('[name=drinkName]').val(),      drinkIngredients: $(e.target).find('[name=drinkIngredients]').val()    };    Meteor.call('drinkInsert', drink, function(error, result) {      // display the error to the user and abort      if (error)        return alert(error.reason);      // show this result but route anyway      if (result.drinkExists)        alert('A drink with this name has already been posted');      Router.go('drinkPage', {_id: result._id});    });  }});