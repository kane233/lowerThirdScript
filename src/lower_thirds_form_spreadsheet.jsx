/* jshint ignore:start */ 
#include "lower_thirds_moudle.jsx"
#include "library/spreadsheetCSV.jsx"
#include "renderComp.jsx"
/* jshint ignore:end */

function LowerThirdsSpreadsheet(file, comp) {
    var spreadsheet = new Spreadsheet(file);

    function applyRow(rowNumber) {
        var colorArray = spreadsheet.getCell(rowNumber, 2).split(",");
        var lowerThirdParameters = {
            mainText: spreadsheet.getCell(rowNumber, 0),
            secondaryText: spreadsheet.getCell(rowNumber, 1),
            fillColor: [
                parseFloat(colorArray[0]) / 255,
                parseFloat(colorArray[1]) / 255,
                parseFloat(colorArray[2]) / 255
            ],
            fadeStartTime: spreadsheet.getCell(rowNumber, 3),
            fadeEndTime: spreadsheet.getCell(rowNumber, 4),
            icon: rowspreadsheet.getCell(rowNumber, 5)
        };

        LowerThirdScript.adjustLowerThird(comp, lowerThirdParameters);
    }
    function renderRow(rowNumber){
        applyRow(rowNumber);
        renderComp(comp);
    }

    function renderAll() {
        for(var i=1;i<spreadsheet.getNumRows();i++){
            renderRow(i);
        }
    }
    this.renderRow = renderRow;
    this.renderAll = renderAll;
}
