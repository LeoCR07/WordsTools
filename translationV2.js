// Importar la librería de Google Cloud Translation
require('dotenv').config();
const {Translate} = require('@google-cloud/translate').v2;
const fs = require('fs')
const path = require('path')
let texto;

//Get the Original list
const csvToJson = require('convert-csv-to-json');
const { Console } = require('console');
const inputFolder = "./samples/"

let files = fs.readdirSync(inputFolder)
let fileInputName = inputFolder + files
let lst = csvToJson.getJsonFromCsv(fileInputName)

// Crear una lista vacía
var listaDatos = [];
var listaTraducciones = [];


for (var i = 0; i < lst.length; i++) {
  

  listaDatos.push(lst[i].English);
}




// Mostrar la lista por consol
console.log(listaDatos);

console.log('**************************************************************')

// Reading targets
const readJSON = ()=>{
  const pathJSON = path.join(__dirname,'/targets.json')
  const data = fs.readFileSync(pathJSON,'utf-8')
  return JSON.parse(data)
};

const totallanguages = readJSON()

// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

// Inicio : 0 -- Afrikaans
// final : 144 -- zulu

//MakeTranslate()

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var name = "animals"
var start = 17
const length = 18
var check = true

const languages = totallanguages.slice(start,length);



console.log(`Los idiomas a traducir son:`);
for (var i = 0; i < languages.length; i++) {
  console.log(` ${i+1} :  ${languages[i].language}`)
}


readline.question('Desea continuar:  S/N\n', (input) => {
  texto = input;
readline.close();

if(texto == "S" || texto == 's'){
  console.clear();
  MakeTranslate()
}else{
  Console.log('Se cancelo la transaccion')
}

});


function MakeTranslate(){
  const promises = [];
  
  for (var i = 0; i < listaDatos.length; i++) {
    for (var j = 0; j < languages.length; j++) {
      promises.push(translate.translate(listaDatos[i], languages[j].code));
    }
  }
  
  Promise.all(promises)
    .then((results) => {
      var listaTraducciones = [];
  
      for (var i = 0; i < listaDatos.length; i++) {
        var traducciones = [];
  
        for (var j = 0; j < languages.length; j++) {
          traducciones.push(results[i * languages.length + j][0]);
          //  traducciones.push(results[i * languages.length + j][0]);
        }
  
        listaTraducciones.push(traducciones);
      }
  
      var lstIdioma = []
  
      for (var j = 0; j < languages.length; j++) {
  
       // console.log(`Traducciones para ${listaDatos[i]}:`);
  
  
        for (var i = 0; i < listaDatos.length; i++) {
          lstIdioma.push(listaTraducciones[i][j])
          //console.log(`${i}:  ${languages[j].code}: ${listaTraducciones[i][j]}`);
        }
  
  
        CreateJson(languages[j].language,lstIdioma,lst,j)
        lstIdioma = []
       
      }


      
      console.log("******************** Idiomas traducidos ******************")
      // show the language traslate
      for (var j = 0; j < languages.length; j++) {
        console.log(`${j} : ${languages[j].language}`)
      }
      
  
      listaTraducciones = [];
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}



//Guardarlo 
function CreateJson(languages,traducciones,datos,indice){



  console.log(`************************ ${indice} : ${languages} *****************************`)
  // Crear una lista de objetos con las propiedades 'name' y 'apellido'


  const miLista = datos.map((e, index) => ({
    'id': parseInt(e.ID),
    ...(check && {'subcat': parseInt(e.IDSub)}),
    'name': traducciones[index]
  }));

  console.log(miLista)

  
  const miListaJSON = JSON.stringify(miLista);

  let fileOutput = 'C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Words/words/' + languages + "/"+ name +".json"

  fs.writeFile(fileOutput,miListaJSON, function(err) {
    if (err) console.log(err)
  } )
  


}

// Crear las carpetas
function CrearFolder(){
  const fs = require('fs');

// Definir la ruta donde se crearán las carpetas
const ruta = './dicvocabulary2.0/Datos/Vocabulary/';

// Array con el nombre de las carpetas que se crearán
const carpetas = languages

// Recorrer el array y crear las carpetas
carpetas.forEach((carpeta) => {
  // Unir la ruta con el nombre de la carpeta

});


for (var i = 0; i < languages.length; i++) {

  if(languages[i].code != "es" || languages[i].code != "en"){
    const rutaCarpeta = ruta + languages[i].language;

    // Crear la carpeta
    fs.mkdir(rutaCarpeta, { recursive: true }, (err) => {
      if (err) throw err;
      console.log(`La carpeta ${languages[i].language} ha sido creada`);
    });
  }

}


}



