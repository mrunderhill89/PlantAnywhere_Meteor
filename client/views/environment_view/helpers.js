Template.environment_view.rendered = function(){
    var canvas = $(this.find(".canvas"));
    if (canvas){
        this.stage = this.stage || new PIXI.Stage(0xFFFFFF);
        this.renderer = this.renderer || PIXI.autoDetectRenderer(canvas.width(),canvas.height());
        canvas.append(this.renderer.view);
    }
};