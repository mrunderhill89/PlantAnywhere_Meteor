Template.environment_view.helpers({
    clear_canvas : function(){
            console.log("Clearing Canvas");
            if (Session.get('init')){
                var canvas = pixi_elements.canvas = $(this.find(".canvas"));
                var stage = pixi_elements.stage = new PIXI.Stage(0xFFFFFF);
                var renderer = pixi_elements.renderer = PIXI.autoDetectRenderer(Math.min(canvas.width(), Window.width),Math.min(canvas.height(), Window.height));
                canvas.append(renderer.view);
                console.log("Canvas Cleared");
            } else {
                console.log("No need to clear Canvas");
                return false;
            }
    },
    draw_soil : function(soil){
        console.log(soil);
    }
});
