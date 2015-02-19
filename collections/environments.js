Environments = new Mongo.Collection('environments');
if (Meteor.isClient){
    Meteor.subscribe('environments');
}
if (Meteor.isServer){
    Meteor.publish('environments', function(){
        var currentUserId = this.userId;
        return Environments.find({createdBy: currentUserId})
    });
    Environment = function(params){
        params || (params = {});
        _.defaults(params, {
            name: "New Environment",
            width: 15,
            height: 15
        });
        this._id = Environments.insert({
            name: params.name,
            width: params.width,
            height: params.height,
            createdBy: Meteor.userId(),
            soil: []
        });
        for (x=0; x < params.width; x++){
            for (y=0; y < params.height; y++){
                var soil = new Soil(this._id, {
                    x:x,
                    y:y
                });
            }
        }
    };
    Meteor.startup(function(){
        Meteor.methods({
            "environment.create": function(params){
                if (params && Meteor.userId()){
                    return new Environment(params);
                };
            },
            "environment.delete": function(_id){
                var env = Environments.findOne(_id);
                if (env && Meteor.userId() === env.createdBy){
                    Environments.remove(_id);
                }
            }
        });
    });
};