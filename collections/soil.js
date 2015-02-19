Soils = new Mongo.Collection('soils');
if (Meteor.isClient){
    Meteor.subscribe('soils', Session.get("current_env"));
}
if (Meteor.isServer){
    Meteor.startup(function(){
        Soil = function(env, params){
            params || (params = {});
            _.defaults(params, {
            });
            this._id = Soils.insert({
                environment: env
            });
            Environments.update({_id:env}, {$push:{soil:this._id}});
        };
    });
    Meteor.publish('soils', function(env_id){
        var result = Soils.find({environment: env_id});
        return result;
    });

    Meteor.startup(function(){
        Meteor.methods({
        });
    });
};