﻿// Licence: Alexander Hartkopf
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

 if(!data || !data.length) {
   const errorList = new ListWidget()
   errorList.addText("Fehler.")
   return errorList
 }

 header = list.addText("🚒 Fahrzeugstatus ".toUpperCase())
 header.centerAlignText()
 header.font = Font.mediumSystemFont(10)

 label = list.addText(data[0].name)
 label.font = Font.mediumSystemFont(20)
 label.centerAlignText()
 const country = list.addText("Deutschland")
 country.centerAlignText()
 country.font = Font.mediumSystemFont(12)
 country.textColor = Color.gray()


 list.addSpacer()

 // fetch new incidents
 let location

 if(args.widgetParameter) {

   const fixedCoordinates = args.widgetParameter.split(",").map(parseFloat)

   location = {
     latitude: fixedCoordinates[0],
     longitude: fixedCoordinates[1]
   }

 } else {

   Location.setAccuracyToThreeKilometers()
     try {
     location = await Location.current()
     console.log('get current lat/lon')
     saveIncidenceLatLon(location)
   } catch(e) {
     console.log('using saved lat/lon')
     location = getsavedIncidenceLatLon()
   }
 }


 


/*
 if(incidence >= 50) {
   label.textColor = Color.red()
 } else if(incidence >= 25) {
   label.textColor = Color.orange()
 }

 const city = list.addText(cityName)
 city.centerAlignText()
 city.font = Font.mediumSystemFont(12)
 city.textColor = Color.gray()

   list.addSpacer()

  label3 = list.addText ("letztes Update: "+lastUpdate.substr(0,10))
 label3.centerAlignText()
 label3.font = Font.mediumSystemFont(6)  

*/
 return list
}