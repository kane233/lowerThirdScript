/* jshint ignore:start */
#include "lower_thirds_moudle.jsx"

#include "library/spreadsheetCSV.jsx"
/* jshint ignore:end */

function updateLowerThirdFormSpreadsheet(file, rowNumber) {
    var spreadsheet = new Spreadsheet(file);

    var colorArray = spreadsheet.getCell(rowNumber,2).split(",");
    var lowerThirdParameters = {
        mainText: spreadsheet.getCell(rowNumber,0),
        secondaryText: spreadsheet.getCell(rowNumber,1),
        fillColor: [
            parseFloat(colorArray[0]) / 255,
            parseFloat(colorArray[1]) / 255,
            parseFloat(colorArray[2]) / 255
        ],
        fadeStartTime: spreadsheet.getCell(rowNumber,3),
        fadeEndTime: spreadsheet.getCell(rowNumber,4),
        icon: rowspreadsheet.getCell(rowNumber,5)
    };

    LowerThirdScript.adjustLowerThird(app.project.activeItem, lowerThirdParameters);
}

updateLowerThirdFormSpreadsheet(new File("F:\\codeResearch\\AEScript\\lowerThirdScript\\test data\\sampleCSV.csv"),1);