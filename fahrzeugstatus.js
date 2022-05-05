// Licence: Alexander Hartkopf
const divera247FahrzeugStatusAPI = 'https://app.divera247.com/api/v2/pull/vehicle-status?accesskey='+args.widgetParameter;

let widget = await createWidget()
if (!config.runsInWidget) {
 await widget.presentSmall()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
 let apiData, header, label

   const list = new ListWidget()


 // fetch vehicle informations
 apiData = await new Request(divera247FahrzeugStatusAPI).loadJSON()

// console.log(apiData)

 if(!apiData) {
   const errorList = new ListWidget()
   errorList.addText("Fehler beim Ausführen.")
   return errorList
 }
 
 header = list.addText("🚒 Fahrzeugstatus ".toUpperCase())
 header.leftAlignText()
 header.font = Font.mediumSystemFont(14)

const kfz_name = apiData.data[0].name
const fms_status = apiData.data[0].fmsstatus

for (let i = 0; i < apiData.length; i++) {
    text += apiData.data[i].name + "<br>";

    label = list.addText(text)
    label.leftAlignText()
    label.font = Font.mediumSystemFont(12) 
}



 
 return list
}