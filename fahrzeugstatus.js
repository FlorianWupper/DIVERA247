// Licence: Alexander Hartkopf
const divera247FahrzeugStatusAPI = `https://app.divera247.com/api/v2/pull/vehicle-status?accesskey=1u1WAMOeD8SIu1iqNZ60Afmf2ZFH1RtF3zh3AkhryvCAwaMAG9O9HCAacuc_7GiJ`;

let widget = await createWidget()
if (!config.runsInWidget) {
 await widget.presentSmall()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
 let apiData, attr, header, label

   const list = new ListWidget()


 // fetch new cases
 apiData = await new Request(divera247FahrzeugStatusAPI).loadJSON()

console.log(apiData)

 if(!apiData) {
   const errorList = new ListWidget()
   errorList.addText("Fehler beim Ausführen.")
   return errorList
 }

 
 header = list.addText("🚒 Fahrzeugstatus ".toUpperCase())
 header.leftAlignText()
 header.font = Font.mediumSystemFont(12)

 var schritt;
 for (schritt = 0; schritt < apiData.lenght; schritt++) {
    const kfz_name = apiData.data[schritt].name
    const fms_status = apiData.data[schritt].fmsstatus

    label = list.addText(kfz_name + ": " + fms_status.toString())
    label.font = Font.mediumSystemFont(10)
    label.leftAlignText()
    console.log
 }

 return list
}