Template.list_environments.helpers({
    environments: function(){
        return Environments.find().fetch();
    }
});

Template.add_environment.events({
    'submit form': function(event){
        event.preventDefault();
        Meteor.call('environment.create', 
        {
            name: event.target.name.value,
            width: event.target.width.value,
            height: event.target.height.value,
        },
        function(err, obj) {
            if (err)
                console.error(err);
            if (obj){
                Router.go("/view/environment/"+obj._id);
            }
        });
    }
});
