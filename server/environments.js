Environments = new Mongo.Collection('environments');
Meteor.publish('environments', function(){
    var currentUserId = this.userId;
    return Environments.find({createdBy: currentUserId})
});

function Soil(params){
    this.x = params.x;
    this.y = params.y;
}

Meteor.methods({
    create_environment: function(params){
        params || (params = {});
        _.defaults(params, {
            name: "New Environment",
            width: 15,
            height: 15
        });
        var currentUserId = Meteor.userId();
        if (currentUserId){
            var env = Environments.insert({
                name: params.name,
                width: params.width,
                height: params.height,
                createdBy: currentUserId,
                soil: []
            });
            for (x=0; x < params.width; x++){
                for (y=0; y < params.height; y++){
                    Environments.update(env, {$push:{soil: new Soil({
                        x:x,
                        y:y
                    })}});
                }
            }
            return env;
        }
    },
    delete_environment: function(_id){
        var currentUserId = Meteor.userId();
        var env = Environments.findOne({createdBy: currentUserId, _id:_id});
        if (env){
            Environments.remove({_id:_id});
        }
    }
});