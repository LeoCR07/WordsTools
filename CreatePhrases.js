// Importar la librería de Google Cloud Translation
require('dotenv').config();
const {Translate} = require('@google-cloud/translate').v2;
const fs = require('fs')
const path = require('path')
const { Console } = require('console');

const inputFolder = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/Datos/Vocabulary";
const outputFolderPhrases = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Phrases";


// Crear una lista vacía
var LstName = [];
var LstTitle = []

// Reading targets
const readJSONTargets = () => {
    const pathJSON = 'C:/Users/leomu/Documents/DicVocabulary/tool/Tool.csv-to-json/targets.json';
    const data = fs.readFileSync(pathJSON, 'utf-8');
    return JSON.parse(data);
  };
  

  
  const language = readJSONTargets()
 // console.log(language)
  

  // Reading targets
const readJSONPhrases = () => {

    const pathJSON = 'C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/Plantillas/Phrases/mainTest.json';
    const data = fs.readFileSync(pathJSON, 'utf-8');
    return JSON.parse(data);
  };

  const phrases = readJSONPhrases()

//console.log(phrases)



for (let i = 0; i < phrases.length; i++) {
  LstName.push(phrases[i].name);
  LstTitle.push(phrases[i].title)
}

  console.log(LstTitle)

  
// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  var name = "mainTest"
  var start = 60
  const length = 80

  const languages = language.slice(start,length);


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


  
  function MakeTranslate() {
    const promises = [];
  
    for (var i = 0; i < LstName.length; i++) {
      for (var j = 0; j < languages.length; j++) {
        promises.push(translate.translate(LstName[i], languages[j].code));
        promises.push(translate.translate(LstTitle[i], languages[j].code));
      }
    }
  
    Promise.all(promises)
      .then((results) => {
        var listaTraducciones = [];
  
        for (var i = 0; i < LstName.length; i++) {
          var traducciones = [];
  
          for (var j = 0; j < languages.length; j++) {
            traducciones.push(results[(i * languages.length + j) * 2][0]);
            traducciones.push(results[(i * languages.length + j) * 2 + 1][0]);
          }
  
          listaTraducciones.push(traducciones);
        }
  
        var lstIdioma = []
  
        for (var j = 0; j < languages.length; j++) {
          for (var i = 0; i < LstName.length; i++) {
            lstIdioma.push(listaTraducciones[i][j * 2]);
            lstIdioma.push(listaTraducciones[i][j * 2 + 1]);
          }
  
          CreateJson(languages[j].language, lstIdioma, LstName, LstTitle, j);
          lstIdioma = []
        }
  
        console.log("******************** Idiomas traducidos ******************")
        // Mostrar los idiomas traducidos
        for (var j = 0; j < languages.length; j++) {
          console.log(`${j} : ${languages[j].language}`)
        }
  
        listaTraducciones = [];
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
  }
  
  
  function CreateJson(language, translations, names, titles, index) {
    console.log(`************************ ${index} : ${language} *****************************`);
  
    const miLista = names.map((e, i) => ({
      dir: phrases[i].dir,
      name: translations[i * 2],
      title: translations[i * 2 + 1]
    }));
  
    console.log(miLista);
  
    const miListaJSON = JSON.stringify(miLista);
  
    const folderPath = `C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Phrases/${language}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  
    const filePath = path.join(folderPath, `${name}.json`);
    fs.writeFile(filePath, miListaJSON, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Archivo ${filePath} guardado exitosamente.`);
      }
    });
  }
  
