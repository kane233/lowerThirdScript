function fileToBinaryString() {
    var input = File.openDialog("choose a file to convert to source code");//new File("path/...")
    if (input === null) return;

    input.encoding = "BINARY";
    input.open('r');
    var content = input.read();
    input.close();

    var contentAsString = content.toSource();
    var variableName = input.name.replace(/\W/g, "").replace(/^\d+/, "");
    var sourceCode = "var " + variableName + " = " + contentAsString + ";\n";

    var output = new File(input.fsName + ".jsx");
    output.open("w");
    output.write(sourceCode);
    output.close();

}

fileToBinaryString();