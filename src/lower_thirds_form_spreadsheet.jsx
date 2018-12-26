#include "lower_thirds_moudle.jsx"

#include "library/spreadsheetCSV.jsx"

function updateLowerThirdFormSpreadsheet(file, rowNumber) {
    var spreadsheet = loadCsvFormFile(file)
    var row = spreadsheet[rowNumber];

    var colorArray = row[2].split(",");
    var lowerThirdParameters = {
        mainText: row[0],
        secondaryText: row[1],
        fillColor: [
            parseFloat(colorArray[0]) / 255,
            parseFloat(colorArray[1]) / 255,
            parseFloat(colorArray[2]) / 255
        ],
        fadeStartTime: row[3],
        fadeEndTime: row[4],
        icon: row[5]
    };

    LowerThirdScript.adjustLowerThird(app.project.activeItem, lowerThirdParameters)
}

updateLowerThirdFormSpreadsheet(new File("F:\\codeResearch\\AEScript\\lowerThirdScript\\test data\\sampleCSV.csv"),1)