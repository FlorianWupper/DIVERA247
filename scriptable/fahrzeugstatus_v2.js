let g = new LinearGradient()
g.locations = [0, 50]
g.colors = [
  new Color("001e4b"),
  new Color("00080f")
]


let w = new ListWidget()

w.setPadding(10, 10, 10, 10)
w.spacing = 4
w.backgroundGradient = g

let titleStack = w.addStack()
titleStack.cornerRadius = 4
titleStack.setPadding(2, 2, 2, 2)
titleStack.backgroundColor = new Color("001e4b")
let wtitle = titleStack.addText("Fahrzeugstatus 🚒")
wtitle.font = Font.semiboldRoundedSystemFont(14)
wtitle.textColor = new Color("fa0019")
w.addSpacer(4)

let row = w.addStack()
w.textColor = new Color("fa0019")

//row = w.addText("Hallo")

const divera247FahrzeugStatusAPI = 'https://app.divera247.com/api/v2/pull/vehicle-status?accesskey='+args.widgetParameter;


apiData = await new Request(divera247FahrzeugStatusAPI).loadJSON()

var text =""
for (let i = 0; i < apiData.data.length; i++) {
    text += apiData.data[i].name + ": " + apiData.data[i].fmsstatus + "\n";
}

row= w.addText(text)
row.textColor = new Color("fa0019")


var heute = new Date();
console.log(heute.toLocaleString());

row= w.addText("Letztes Update: " + heute.toLocaleString())
row.textColor = new Color("aaa")

w.presentMedium()
