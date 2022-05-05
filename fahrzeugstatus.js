// Licence: Alexander Hartkopf
const i = new Request('https://www.divera247.com/downloads/grafik/divera247_app_v2_icon.png')

const j = new Request('https://www.divera247.com/downloads/grafik/divera247_logo_800.png')

const img = await i.loadImage()
const img2 = await j.loadImage()


const divera247FahrzeugStatusAPI = 'https://app.divera247.com/api/v2/pull/vehicle-status?accesskey=1u1WAMOeD8SIu1iqNZ60Afmf2ZFH1RtF3zh3AkhryvCAwaMAG9O9HCAacuc_7GiJ'
//'+args.widgetParameter;

let widget = await createWidget()
if (!config.runsInWidget) {
 await widget.presentSmall()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
 let apiData, header, label, sub

   const list = new ListWidget()
   let image = list.addImage(img2)
  image.imageSize = new Size(40,40)
  image.rightAlignImage()
  
  list.addSpacer(2)


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

//const kfz_name = apiData.data[0].name
//const fms_status = apiData.data[0].fmsstatus

console.log(apiData)
console.log("Array Länge: " + apiData.data.length)
console.log("Beispieldaten: " + apiData.data[0].name)

var text =""
for (let i = 0; i < apiData.data.length; i++) {
    text += apiData.data[i].name + ": " + apiData.data[i].fmsstatus + "\n";
}

label = list.addText(text)
label.leftAlignText()
label.font = Font.mediumSystemFont(12) 

var heute = new Date();
console.log(heute.toLocaleString());

sub = list.addText("Letztes Update: " + heute.toLocaleString())
sub.leftAlignText()
sub.font = Font.mediumSystemFont(12) 

 
 return list
}