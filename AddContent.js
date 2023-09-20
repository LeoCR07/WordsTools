const fs = require('fs');
const path = require('path');

// Importar la librería de Google Cloud Translation
require('dotenv').config();
const {Translate} = require('@google-cloud/translate').v2;



var name = "animals"
var check = true
var start = 17
const length = 18

//Spanish 16 /17
//English 17 /18

const inputFolder_2 = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Words/words/animals.json";

const outputFolderWords = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Words/words/animals.json";



//Get the Original list
const csvToJson = require('convert-csv-to-json');
const { Console } = require('console');
const inputFolder = "./samples/"

let files = fs.readdirSync(inputFolder)
let fileInputName = inputFolder + files
let lst = csvToJson.getJsonFromCsv(fileInputName)

// Crear una lista vacía
var listaDatos = [];


for (var i = 0; i < lst.length; i++) {
   // listaDatos.push(lst[i].Spannish);
    listaDatos.push(lst[i].English);
}




// Mostrar la lista por consol
console.log(listaDatos);

//********************************************************************************************* */
//TRADUCTOR

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
  


// Reading targets
const readJSON = ()=>{
    const pathJSON = path.join(__dirname,'/targets.json')
    const data = fs.readFileSync(pathJSON,'utf-8')
    return JSON.parse(data)
  };
  
  const totallanguages = readJSON()
  const languages = totallanguages.slice(start,length);


  console.log(`Vas a agregar ${name}: estos idiomas`);
  for (var i = 0; i < languages.length; i++) {
    console.log(` ${i+1} :  ${languages[i].language}`)
  }
  
  
  readline.question('Desea continuar:  S/N\n', (input) => {
    texto = input;
  readline.close();
  
  if(texto == "S" || texto == 's'){
    console.clear();
    MakeIt()
    //See()

  }else{
    Console.log('Se cancelo la transaccion')
  }
  
  });
  


function MakeIt(){

    /*
    for (var i = 0; i < languages.length; i++) {

        const inputFolder_1 = `C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Words/words/${languages[i].language}/${name}.json`;
    
        // Lee el archivo JSON 
    fs.readFile(inputFolder_1, 'utf8', (err, data) => {
        
        if (err) {
          console.error('Error al leer el archivo JSON:', err);
          return;
        }
      
        try {
          // Parsea el JSON y lo imprime en la consola
          const json = JSON.parse(data);
          console.log('Contenido del JSON:');
          
          console.log(json);
    
        } catch (parseError) {
          console.error('Error al analizar el JSON:', parseError);
        }
      });
    }
    */
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

function CreateJson(languages,traducciones,datos,indice){



    console.log(`************************ ${indice} : ${languages} *****************************`)
    // Crear una lista de objetos con las propiedades 'name' y 'apellido'
  
    const inputFolder_1 = `C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Words/words/${languages}/${name}.json`;
    
    fs.readFile(inputFolder_1, 'utf8', (err1, data1) => {
        if (err1) {
          console.error('Error al leer el primer archivo JSON:', err1);
          return;
        }

        //console.log(data1)


        const data2 = datos.map((e, index) => ({
            'id': parseInt(e.ID),
            ...(check && {'subcat': parseInt(e.IDSub)}),
            'name': traducciones[index]
          }));
   
        
          
          try {
      
              let fileOutput = 'C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Words/words/' + languages + "/"+ name +".json"
      
              // Parsea ambos archivos JSON en objetos JavaScript
              const objeto1 = JSON.parse(data1);
            //  const objeto2 = JSON.parse(data1);

                   
             // Console.log("Datos: ")
              //console.log(data2)
        

      
              // Convierte el objeto combinado en JSON
            
            const listaCombinada = objeto1.concat(data2);

            const listaCombinadaJSON = JSON.stringify(listaCombinada, null, 0);

            // Ruta donde deseas guardar el archivo
    
            
            // Escribe la cadena JSON en el archivo
            fs.writeFile(fileOutput, listaCombinadaJSON, 'utf8', (err) => {
              if (err) {
                console.error('Error al escribir el archivo JSON:', err);
              } else {
                console.log('Archivo JSON guardado correctamente en', fileOutput);
              }})

          }catch (parseError) {
            console.error('Error al analizar uno de los archivos JSON:', parseError);
          }

    })
  
    


   
  
    /*
    fs.writeFile(fileOutput,miListaJSON, function(err) {
      if (err) console.log(err)
    } )
    */
    
  

    
  
  }


  function See(){
    const languages = "Spanish"
    const inputFolder_1 = `C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Words/words/${languages}/${name}.json`;
    

    fs.readFile(inputFolder_1, 'utf8', (err1, data1) => {
        if (err1) {
          console.error('Error al leer el primer archivo JSON:', err1);
          return;
        }


            try {
    // Analiza la cadena JSON en un objeto JavaScript
    const lista1 = JSON.parse(data1);

    const lista2 = [
      {"id": 0, "subcat": 1, "name": "Perro"},
      {"id": 1, "subcat": 1, "name": "Oveja"},
      {"id": 2, "subcat": 1, "name": "Cerdo"}
    ];

    // Combina las dos listas en una sola
    const listaCombinada = lista2.concat(lista1);

    //console.log(listaCombinada);
  } catch (parseError) {
    console.error('Error al analizar el JSON del primer archivo:', parseError);
  }


        }

        
    )



  }