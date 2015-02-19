Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/', function () {
    this.render('home');
});

Router.route('view/environment/:_id', function () {
    var env = Environments.findOne(this.params._id);
    if (env){
        Session.set("current_env",this.params._id);
        this.render('environment_view', {data: function () {
          return env;
        }});
    } else {
        this.redirect('/');
    }
});

Router.route('view/environment', function(){
    var current_env = Session.get("current_env");
    if (current_env){
        this.redirect('/view/environment/'+current_env);
    } else {
        this.redirect('/');
    }
});

Router.route('delete/environment/:_id', function () {
    Meteor.call("environment.delete", this.params._id);
    this.redirect('/');
});