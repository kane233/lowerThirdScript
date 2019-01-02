function renderComp(comp) {
    var rqItem = app.project.renderQueue.items.add(comp);
    rqItem.applyTemplate("最佳设置");
    rqItem.outputModule(1).applyTemplate("无损");
    rqItem.outputModule(1).file = new File("F:\\zhunxing\\renderOutPut\\DELETE\\text");
    //app.project.renderQueue.render();
}


renderComp(app.project.activeItem);