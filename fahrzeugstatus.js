// Licence: Alexander Hartkopf
const divera247FahrzeugStatusAPI = `https://app.divera247.com/api/v2/pull/vehicle-status?accesskey=1u1WAMOeD8SIu1iqNZ60Afmf2ZFH1RtF3zh3AkhryvCAwaMAG9O9HCAacuc_7GiJ`;

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
 header.font = Font.mediumSystemFont(10)

const kfz_name = apiData.data[0].name
const fms_status = apiData.data[0].fmsstatus

label = list.addText(kfz_name + ": " + fms_status)
label.centerAlignText()
label.font = Font.mediumSystemFont(24) 

label = list.addText(apiData.data[1].name + ": " + apiData.data[1].fmsstatus)
label.centerAlignText()
label.font = Font.mediumSystemFont(24) 

if(fms_status = 4) {
    label.textColor = Color.red()
  } else if(fms_status = 3) {
    label.textColor = Color.orange()
  }
 
 return list
}