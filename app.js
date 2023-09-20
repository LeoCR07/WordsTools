
var name = "foods"
var check = true


const fs = require("fs")
const csvToJson = require('convert-csv-to-json')

// Drop your csv files into the "inputs" folder.
const inputFolder = "./inputs/"

// Json files will be created into "output" folder.
const outputFolder = "./dicvocabulary2.0/Datos/Vocabulary/Spanish/"

const outputFolderSpanish = "./dicvocabulary2.0/Datos/Vocabulary/Spanish/"
const outputFolderEnglish = "./dicvocabulary2.0/Datos/Vocabulary/English/"


// Read files.
let files = fs.readdirSync(inputFolder)

// Iterate and convert from csv to json.
for (let file of files) {

    //input
    let fileInputName = inputFolder + file

    //outputs
    let fileOutputSpanish = outputFolderSpanish + name + ".json"
    let fileOutputEnglish = outputFolderEnglish + name + ".json"


    // Convert csv to json.
    let jsonSpanish = csvToJson.getJsonFromCsv(fileInputName)
    let jsonEnglish = csvToJson.getJsonFromCsv(fileInputName)


    // Filter json to get id and name.
    let Spanish = jsonSpanish.map(object => {
        
        if(check){
            return {
                id: parseInt(object.ID),
                subcat: parseInt(object.IDSub),
                name: object.esp
            }
        }else{
            return {
                id: parseInt(object.ID),
                name: object.esp
            }
        }

    })
    
    
    let English= jsonEnglish.map(object => {

        if(check){
            return {
                id: parseInt(object.ID),
                subcat: parseInt(object.IDSub),
                name: object.eng
            }
        }else{
            return {
                id: parseInt(object.ID),
                name: object.eng
            }
        }

    })


    // Write json file.
    fs.writeFile(fileOutputSpanish, JSON.stringify(Spanish), function(err) {
        if (err) console.log(err)
    })

    fs.writeFile(fileOutputEnglish, JSON.stringify(English), function(err) {
        if (err) console.log(err)
    })
}