function fileToBinaryString() {

    var input = File.openDialog("choose a file to convert to source code");//new File("path/...")
    if (input === null) return;

    var rawData = readBianryFile(input);
    var variableName = stringToValidVariableName(input.name);
    var sourceCode = convertRawDataToSourceCode(rawData, variableName);
    writeBinaryFile(input.fsName + ".jsx", sourceCode);


    function convertRawDataToSourceCode(rawData, variableName) {
        var contentAsString = rawData.toSource();
        var sourceCode = "var " + variableName + " = " + contentAsString + ";\n";
        return sourceCode;
    }

    function readBianryFile(file) {
        file.encoding = "BINARY";
        file.open('r');
        var content = file.read();
        file.close();
        return content;
    }

    function writeBinaryFile(filePath, content) {
        var output = new File(filePath);
        output.open("w");
        output.write(sourceCode);
        output.close();
    }

    function stringToValidVariableName(string) {
        return string.replace(/\W/g, "")  //remove anything that is not letter,digit or _
        .replace(/^\d+/, "");  //remove any digits at the beginning
    }
}

fileToBinaryString();