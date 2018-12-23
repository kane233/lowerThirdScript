#include "library/ui.jsx"

function deleteAllKeyframes(property) {
    while (property.numKeys > 0) {
        property.removeKey(1);
    }
};


function fadeInLayer(layer, startTime, endTime) {

    var opacityProperty = layer.property("ADBE Transform Group").property("ADBE Opacity");
    deleteAllKeyframes(opacityProperty);

    opacityProperty.setValueAtTime(startTime, 0);
    opacityProperty.setValueAtTime(endTime, 100);
};


function adjustLowerThird(comp, lowerThirdParameters) {
    var layerMainText = comp.layer("main text");
    var layerSecondaryText = comp.layer("secondary text");
    var layerIcon = comp.layer("icon");

    app.beginUndoGroup("modify lower third");
    // here we set our texts
    if (layerMainText != null) {
        layerMainText.property("ADBE Text Properties").property("ADBE Text Document").setValue(lowerThirdParameters.mainText);
    }
    if (layerSecondaryText != null) {
        layerSecondaryText.property("ADBE Text Properties").property("ADBE Text Document").setValue(lowerThirdParameters.secondaryText);
    }

    // here we set the fill color
    if (layerIcon != null) {
        layerIcon.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").setValue(lowerThirdParameters.fillColor);
        fadeInLayer(layerIcon, lowerThirdParameters.fadeStartTime, lowerThirdParameters.fadeEndTime);

    }


    if (layerSecondaryText != null) {
        fadeInLayer(layerSecondaryText, lowerThirdParameters.fadeStartTime, lowerThirdParameters.fadeEndTime);
    }

    if (layerMainText != null) {
        fadeInLayer(layerMainText, lowerThirdParameters.fadeStartTime, lowerThirdParameters.fadeEndTime);
    }

    if (layerIcon != null) {
        var iconPrecomp = layerIcon.source;
        if (iconPrecomp instanceof CompItem) {
            iconPrecomp.layer("mamoworld").enabled = false;
            iconPrecomp.layer("iexpressions").enabled = false;
            iconPrecomp.layer("mochaimport").enabled = false;
            var visibleIconLayer = iconPrecomp.layer(lowerThirdParameters.icon);
            if (visibleIconLayer != null) {
                visibleIconLayer.enabled = true;
            }
        }
    }

    app.endUndoGroup();

};


///////////////////////////////////////////////////////////////////////////////////////////////////////////// Main

var resourceString =
    "group{orientation:'column', alignment:['fill','fill'],alignChildren:['left','top'],\
    icon: IconButton{preferredSize:[60,22]},\
    mainTextGroup: Group{orientation:'row',\
        mainTextLabel:StaticText{text:'main text', preferredSize:[80,-1]},\
        mainText: EditText{text:'enter main text here', characters:40}\
    },\
    secondaryTextGroup: Group{orientation:'row',\
        secondaryTextLabel:StaticText{text:'secondary text', preferredSize:[80,-1]},\
        secondaryText: EditText{text:'enter secondary text here', characters:40}\
    },\
    iconGroup: Group{orientation:'row',\
        iconLabel:StaticText{text:'icon', preferredSize:[80,-1]},\
        iconMamworld: RadioButton{text:'mamoworld', value:true},\
        iconMochaImport: RadioButton{text:'MochaImport'},\
        iconiExpressions: RadioButton{text:'iExpressions'}\
        },\
    colorGroup: Group{orientation:'row',\
        colorLabel:StaticText{text:'color (RGB)', preferredSize:[80,-1]},\
        redText: EditText{text:'243', characters:3},\
        greenText: EditText{text:'151', characters:3},\
        blueText: EditText{text:'27', characters:3},\
    },\
    fadeDurationGroup: Group{orientation:'row',\
        fadeDurationLabel:StaticText{text:'fade duration', preferredSize:[80,-1]},\
        fadeDurationText: EditText{text:'1.0', characters:3}\
    },\
    applyButton: Button{text:'Apply', alignment:['center', 'bottom']}\
}";


var UI = createUserInterface(this, resourceString, "lower third script");

UI.icon.image = new File("D:\\project\\AEScript\\lower thirds script\\img\\logo.png");

UI.fadeDurationGroup.fadeDurationText.onChange = function () {
    var myVal = parseFloat(UI.fadeDurationGroup.fadeDurationText.text);
    if (isNaN(myVal)) {
        UI.fadeDurationGroup.fadeDurationText.text = 0;
    }
};

UI.applyButton.onClick = function () {

    var lowerThirdParameters = {
        mainText: UI.mainTextGroup.mainText.text,
        secondaryText: UI.secondaryTextGroup.secondaryText.text,
        fillColor: [
            parseFloat(UI.colorGroup.redText.text) / 255,
            parseFloat(UI.colorGroup.greenText.text) / 255,
            parseFloat(UI.colorGroup.blueText.text) / 255
        ],
        fadeInDuration: parseFloat(UI.fadeDurationGroup.fadeDurationText.text),
        fadeStartTime: 0,
        icon: undefined
    };

    if (UI.iconGroup.iconMamworld.value) {
        lowerThirdParameters.icon = "mamoworld";
    }
    else if (UI.iconGroup.iconMochaImport.value) {
        lowerThirdParameters.icon = "mochaimport";
    }
    else if (UI.iconGroup.iconiExpressions.value) {
        lowerThirdParameters.icon = "iexpressions";
    }
    lowerThirdParameters.fadeEndTime = lowerThirdParameters.fadeStartTime + lowerThirdParameters.fadeInDuration;

    ///////////// here follow the commands that do the job

    var comp = app.project.activeItem;

    if (comp instanceof CompItem) {
        adjustLowerThird(comp, lowerThirdParameters);
    }
    else {
        alert("Please select a composition with lower third");
    }
}

