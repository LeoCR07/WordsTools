var name = "books"
//var check = true

/******************************************************* */

const fs = require("fs")
const csvToJson = require('convert-csv-to-json')

// Drop your csv files into the "inputs" folder.
const inputFolder = "./inputs/"

// Json files will be created into "output" folder.

const outputFolderSpanish = "./dicvocabulary2.0/Datos/Books/Spanish/"
/*
const outputFolderDutch= "./dicvocabulary2.0/Datos/Vocabulary/Dutch/"
const outputFolderFrench = "./dicvocabulary2.0/Datos/Vocabulary/French/"
const outputFolderGerman = "./dicvocabulary2.0/Datos/Vocabulary/German/"
const outputFolderItalian = "./dicvocabulary2.0/Datos/Vocabulary/Italian/"
const outputFolderPortuguese = "./dicvocabulary2.0/Datos/Vocabulary/Portuguese/"
const outputFolderEnglish = "./dicvocabulary2.0/Datos/Vocabulary/English/"*/


// Read files.
let files = fs.readdirSync(inputFolder)

// Iterate and convert from csv to json.
for (let file of files) {

    //input
    let fileInputName = inputFolder + file

    //outputs
    let fileOutputSpanish = outputFolderSpanish + name + ".json"
    /*
    let fileOutputDutch = outputFolderDutch + name + ".json"
    let fileOutputFrench = outputFolderFrench + name + ".json"
    let fileOutputGerman = outputFolderGerman + name + ".json"
    let fileOutputItalian  = outputFolderItalian + name + ".json"
    let fileOutputPortuguese = outputFolderPortuguese + name + ".json"
    let fileOutputEnglish = outputFolderEnglish + name + ".json"*/


    // Convert csv to json.
    let jsonSpanish = csvToJson.getJsonFromCsv(fileInputName)

    /*
    let jsonDutch = csvToJson.getJsonFromCsv(fileInputName)
    let jsonFrench = csvToJson.getJsonFromCsv(fileInputName)
    let jsonGerman  = csvToJson.getJsonFromCsv(fileInputName)
    let jsonItalian = csvToJson.getJsonFromCsv(fileInputName)
    let jsonPortuguese = csvToJson.getJsonFromCsv(fileInputName)
    let jsonEnglish = csvToJson.getJsonFromCsv(fileInputName)*/


    // Filter json to get id and name.
    let Spanish = jsonSpanish.map(e => {

        return {
            name:e.IDCat,
            image: e.IDSub,
            description:e.ID,
            stars:parseInt(e.eng),
            time:parseInt(e.esp),
            cats:e.german,
         
        }


    })
    
    /*
    let Dutch= jsonDutch.map(object => {

        if(check){
            return {
                id: parseInt(object.ID),
                subcat: parseInt(object.IDSub),
                name: object.hol
            }
        }else{
            return {
                id: parseInt(object.ID),
                name: object.hol
            }
        }


    })

    let French= jsonFrench.map(object => {

        if(check){
            return {
                id: parseInt(object.ID),
                subcat: parseInt(object.IDSub),
                name: object.fras
            }
        }else{
            return {
                id: parseInt(object.ID),
                name: object.fras
            }
        }

    })
    let German= jsonGerman.map(object => {
        if(check){
            return {
                id: parseInt(object.ID),
                subcat: parseInt(object.IDSub),
                name: object.german
            }
        }else{
            return {
                id: parseInt(object.ID),
                name: object.german
            }
        }

    })
    let Italian = jsonItalian.map(object => {

        if(check){
            return {
                id: parseInt(object.ID),
                subcat: parseInt(object.IDSub),
                name: object.itali
            }
        }else{
            return {
                id: parseInt(object.ID),
                name: object.itali
            }
        }

    })
    let Portuguese= jsonPortuguese.map(object => {

        if(check){
            return {
                id: parseInt(object.ID),
                subcat: parseInt(object.IDSub),
                name: object.port
            }
        }else{
            return {
                id: parseInt(object.ID),
                name: object.port
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

    */

    // Write json file.
    fs.writeFile(fileOutputSpanish, JSON.stringify(Spanish), function(err) {
        if (err) console.log(err)
    })

    /*
    fs.writeFile(fileOutputDutch, JSON.stringify(Dutch), function(err) {
        if (err) console.log(err)
    })

    fs.writeFile(fileOutputEnglish, JSON.stringify(English), function(err) {
        if (err) console.log(err)
    })

    fs.writeFile(fileOutputFrench, JSON.stringify(French), function(err) {
        if (err) console.log(err)
    })

    fs.writeFile(fileOutputGerman, JSON.stringify(German), function(err) {
        if (err) console.log(err)
    })

    fs.writeFile(fileOutputPortuguese, JSON.stringify(Portuguese), function(err) {
        if (err) console.log(err)
    })

    fs.writeFile(fileOutputItalian, JSON.stringify(Italian), function(err) {
        if (err) console.log(err)
    })
*/

}