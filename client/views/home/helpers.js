Template.list_environments.helpers({
    environments: function(){
        return Environments.find().fetch();
    }
});

Template.add_environment.events({
    'submit form': function(event){
        event.preventDefault();
        Meteor.call('create_environment', 
        {
            name: event.target.name.value,
            width: event.target.width.value,
            height: event.target.height.value,
        },
        function(err, data) {
            if (err)
                console.error(err);
            Router.go("/view/environment/"+data);
        });
    }
});
