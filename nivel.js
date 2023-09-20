var name = "levelsV2"

/******************************************************* */

const fs = require("fs")
const csvToJson = require('convert-csv-to-json')

// Drop your csv files into the "inputs" folder.
const inputFolder = "./inputs/"
//const inputFolder = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/Plantillas/Nivel"


// Json files will be created into "output" folder.
const outputFolder = "./dicvocabulary2.0/Datos/Vocabulary/Spanish/"

const outputFolderSpanish = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Levels/Spanish/"
const outputFolderEnglish = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Levels/English/"


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

        return {
            dir:object.IDCat,
            cats: object.IDSub,
            style: object.words,
            name: object.ID,
            stars: parseInt(object.eng),
            img: object.img
        }
    })
    
    let English= jsonEnglish.map(object => {

        return {
            dir:object.IDCat,
            cats:object.IDSub,
            style: object.words,
            name: object.esp,
            stars: parseInt(object.eng),
            img: object.img
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