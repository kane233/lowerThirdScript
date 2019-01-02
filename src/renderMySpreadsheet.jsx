/* jshint ignore:start */ 
#include "lower_thirds_form_spreadsheet.jsx"
/* jshint ignore:end */

var templateProjectFile = new File("F:\\codeResearch\\AEScript\\lowerThirdScript\\projectFile\\beginner scripting lower third（converted）.aep");
var spreadsheetFile = new File("F:\\codeResearch\\AEScript\\lowerThirdScript\\test data\\sampleCSV.csv");

app.open(templateProjectFile);
var mainComp = app.project.item(5);
var lowerThirdSpreadSheet = new LowerThirdsSpreadSheet(spreadsheetFile,mainComp);
lowerThirdSpreadSheet.renderAll();
app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);