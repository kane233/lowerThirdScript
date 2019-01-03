function renderComp(comp, options) {

    function applyArrayToOutputModules(rqItem,array,doSomething){
        if(!(array instanceof Array)) array = [array];
        for(var i=0;i<array.length;i++){
            if(i >= rqItem.outputModules.length) rqItem.outputModules.add();
            doSomething(rqItem.outputModule(i+1),array[i]);
        }
    }

    function applyOutputModuleTemplates(rqItem, omTemplates) {
        applyArrayToOutputModules(rqItem,omTemplates,function(om,omTemplate){
            om.applyTemplate(omTemplate);
        });
    }

    function applyOutputModuleFiles(rqItem, files) {
        applyArrayToOutputModules(rqItem, files,function(om,myFile){
            if (!(myFile instanceof File)) myFile = new File(myFile);
            om.file = myFile;
        });
    }

    function applyOutputModuleSettings(rqItem, omSettings) {
        applyArrayToOutputModules(rqItem, omSettings,function(om,mySettings){
            om.setSettings(mySettings);
        });
    }

    function clearRenderQueue() {
        forAllRenderQueueItems(function(rqItem){
            rqItem.remove();
        },{backwards:true});
    }

    function forAllRenderQueueItems(dosomething,options) {
        var i;
        options =options || {};
        if(options.backwards === true){
            for(i=app.project.renderQueue.items.length;i>0;i--){
                dosomething(app.project.renderQueue.item(i),i);
        }
    }
        else {
        for(i=1;i <= app.project.renderQueue.items.length;i++){
            dosomething(app.project.renderQueue.item(i),i);
           }
        }
    }

    options = options || {};

    if(options.clearRenderQueue !== false) clearRenderQueue();
    var rqItem = app.project.renderQueue.items.add(comp);
    if (options.renderSettingsTemplate) rqItem.applyTemplate(options.renderSettingsTemplate);
    if (options.outputMoudleTemplate) applyOutputModuleTemplates(rqItem, options.outputMoudleTemplate);
    if (options.file) applyOutputModuleFiles(rqItem, options.file);
    if (options.renderSettings) rqItem.setSettings(options.renderSettings);
    if (options.outputModuleSettings) applyOutputModuleSettings(rqItem,options.outputModuleSettings);

    var doRender = (options.startRender !== false);
    if(options.renderInAME === true){
        app.project.renderQueue.queueInAME(doRender);
    }
    else {
        if(doRender) app.project.renderQueue.render();
    }

}

/* example rendering with AME
renderComp(app.project.activeItem, {
    renderSettingsTemplate: "最佳设置",
    file: [ "F:\\zhunxing\\renderOutPut\\DELETE\\foo.mov"],
    renderInAME:true
});
*/

/* complex example
renderComp(app.project.activeItem, {
    renderSettingsTemplate: "最佳设置",
    outputMoudleTemplate: ["无损", "多机序列"],
    file: [new File("F:\\zhunxing\\renderOutPut\\DELETE\\test.mov"), "F:\\zhunxing\\renderOutPut\\DELETE\\foo.mov"],
    renderSettings: {
        "Time Span": "Length of Comp"
    },
    outputModuleSettings:[
        {Resize:"true","Resize Quality":"High","Resize to":{x:1300,y:731}},
        {Resize:"true","Resize Quality":"High","Resize to":{x:1600,y:831}}
    ],
    startRender:false,
    clearRenderQueue:false
});
*/