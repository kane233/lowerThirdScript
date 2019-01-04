function renderComp(comp) {
    var rqItem = app.project.renderQueue.items.add(comp);

    rqItem.outputModule(1).file = new File("F:\\zhunxing\\renderOutPut\\DELETE\\text");
    app.project.renderQueue.queueInAME(true);
    alert("ok");

    /*
    rqItem.applyTemplate("最佳设置");
    rqItem.outputModule(1).applyTemplate("无损");
    rqItem.outputModule(1).file = new File("F:\\zhunxing\\renderOutPut\\DELETE\\text");
    rqItem.outputModules.add();
    rqItem.outputModule(2).applyTemplate("仅 Alpha");
    rqItem.outputModule(2).file = new File("F:\\zhunxing\\renderOutPut\\DELETE\\foo");
    rqItem.setSetting("Time Span","Length of Comp");
    
    //rqItem.outputModule(2).setSetting("Resize","true")
    //rqItem.outputModule(2).setSetting("Resize Quality","High")
    //rqItem.outputModule(2).setSetting("Resize to","HDV/HDTV 720 25")
    
    rqItem.outputModule(2).setSettings({Resize:"true","Resize Quality":"High","Resize to":{x:1300,y:731}});
    //app.project.renderQueue.render();
    */ 
}


renderComp(app.project.activeItem);