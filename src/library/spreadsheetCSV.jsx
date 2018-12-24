function loadCsvFormFile(file, options) {
    option = option || {};
    file.encoding = options.encoding || "utf-8";
    if (!file.open("r")) {
        throw new Error("could not open file:" + file.error);
    }
    var rawData = file.read();
    file.close();
    if (file.error != "") throw new Error("could not read file:" + file.error);

    return parseCSVString(rawData, options);
};

function parseCSVString(csvString, options) {
    option = option || {};
    var separatorSymbol = options.separatorSymbol || ",";

    var currentRow = 0;
    var currentColumn = -1; //will be increased to 0 during first loop iteration
    var thisCell = "";
    var i;
    var token;
    var cellStart = true;
    var insideQuote;

    function processCellStart() {
        thisCell = "";
        currentColumn++;
        insideQuote = (token == '"');
        if (insideQuote) {
            i++
            token = csvString[i]
        }
    };

    for (i = 0; i < csvString.length; i++) {
        token = csvString[i];
        if (cellStart) {
            processCellStart();
        }
    }

};


loadCsvFormFile(file)