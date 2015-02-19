Template.environment_view.rendered = function(){
    var canvas = $(this.find(".canvas"));
    this.stage = (this.stage || new PIXI.Stage(0xFFFFFF));
    this.renderer = (this.renderer || PIXI.autoDetectRenderer(Math.min(canvas.width(), Window.width),Math.min(canvas.height(), Window.height)));
    canvas.append(this.renderer.view);
};