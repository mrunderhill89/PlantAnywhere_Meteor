Environments = function(){
    if (Meteor.isServer){
        var data = this.data = new Mongo.Collection('environments');
        Meteor.publish('environments', function(){
            var currentUserId = this.userId;
            return data.find({createdBy: currentUserId})
        });
    } else {
        Meteor.subscribe('environments');
        this.data = new Mongo.Collection('environments');
    }
};

if (Meteor.isClient){
    env_data = new Environments();
} else {
    Environment = function(db, params){
        params || (params = {});
        _.defaults(params, {
            name: "New Environment",
            width: 15,
            height: 15
        });
        this._id = db.insert({
            name: params.name,
            width: params.width,
            height: params.height,
            createdBy: params.userId,
            soil: []
        });
    }
    
    _.extend(Environments.prototype, {
        create: function(params){
            var currentUserId = Meteor.userId();
            if (currentUserId){
                _.extend(params, {userId:currentUserId})
                return new Environment(this.data, params);
            }
        },
        remove: function(_id){
            var currentUserId = Meteor.userId();
            var env = this.data.findOne({createdBy: currentUserId, _id:_id});
            if (env){
                this.data.remove({_id:_id});
            }
        }
    });
    env_data = new Environments();
    var meteor_methods = _.reduce(
        {create:"create", remove:"delete"},
        function(methods, meteor_name, name){
            methods["environment."+meteor_name] = Environments.prototype[name].bind(env_data);
            return methods;
        },
        {}
    )
    Meteor.methods(meteor_methods);
};