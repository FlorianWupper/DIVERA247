// Licence: Alexander Hartkopf
const divera247FahrzeugStatusAPI = `https://app.divera247.com/api/v2/pull/vehicle-status?accesskey=1u1WAMOeD8SIu1iqNZ60Afmf2ZFH1RtF3zh3AkhryvCAwaMAG9O9HCAacuc_7GiJ`;

/*const incidenceUrl = (location) => ``

const saveIncidenceLatLon = (location) => {
 let fm = FileManager.iCloud()
 let path = fm.joinPath(fm.documentsDirectory(), "covid19latlon.json")
 fm.writeString(path, JSON.stringify(location))
}

const getsavedIncidenceLatLon = () => {
 let fm = FileManager.iCloud()
 let path = fm.joinPath(fm.documentsDirectory(), "covid19latlon.json")
 let data = fm.readString(path)
 return JSON.parse(data)
}*/

let widget = await createWidget()
if (!config.runsInWidget) {
 await widget.presentSmall()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
 let data, attr, header, label

   const list = new ListWidget()


 // fetch new cases
 data = await new Request(divera247FahrzeugStatusAPI).loadJSON()

console.log(data)

 if(!data) {
   const errorList = new ListWidget()
   errorList.addText("Fehler.")
   return errorList
 }

 
 header = list.addText("🚒 Fahrzeugstatus ".toUpperCase())
 header.centerAlignText()
 header.font = Font.mediumSystemFont(12)

 var schritt;
 for (schritt = 0; schritt < data.lenght; schritt++) {
    const kfz_name = data.data[schritt].name
    const fms = data.data[schritt].fmsstatus

    label = list.addText(kfz_name + ": " + fms.toString())
    label.font = Font.mediumSystemFont(10)
    label.centerAlignText()
 }

 





 list.addSpacer()

 list.addSpacer()

/*
  label3 = list.addText ("letztes Update: "+lastUpdate.substr(0,10))
 label3.centerAlignText()
 label3.font = Font.mediumSystemFont(6)  
*/

 return list
}