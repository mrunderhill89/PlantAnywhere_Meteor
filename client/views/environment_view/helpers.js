function clear_canvas(template){

    /*
    if (!template.stage){
        
        var stage = template.stage = new PIXI.Stage(0xFFFFFF);
        var renderer = template.renderer = PIXI.autoDetectRenderer(Math.min(canvas.width(), Window.width),Math.min(canvas.height(), Window.height));
        canvas.append(renderer.view);
        console.log("Canvas Cleared");
    } else {
        console.log("No need to clear Canvas");
    }
    */
}

Template.environment_view.helpers({
    clear_canvas : function(){
        var template = Template.instance();
        if (!template.stage){
            console.log("Create New Stage");
            var stage = template.stage = new PIXI.Stage(0xFFFFFF);
            console.log(template.$(".canvas"));
        } else {
            
        }
        console.log(template);
    },
    draw_soil : function(soil){
        console.log(soil);
    }
});
