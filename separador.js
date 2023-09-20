const fs = require('fs');
const path = require('path');

const inputFolder = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/Datos/Vocabulary";
const outputFolderPhrases = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Phrases";
const outputFolderWords = "C:/Users/leomu/Documents/DicVocabulary/dicvocabulary2.0/DatosV2/Words/words";

let archivo = "descriptions.json";
let nameFrases = "animals.json";
let sub = 2;
let words = true;
let copy = true;
let phrases = false;

function processFolder(folderPath, relativePath) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      const newFolderPathPhrases = path.join(outputFolderPhrases, relativePath, file);
      const newFolderPathWords = path.join(outputFolderWords, relativePath, file);

      fs.mkdirSync(newFolderPathPhrases, { recursive: true });
      fs.mkdirSync(newFolderPathWords, { recursive: true });

      processFolder(filePath, path.join(relativePath, file));
    } else if (file === archivo) {
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(content);


      if(phrases){

      // Filtra los elementos con subcat 
      const filteredData = jsonData.filter(item => item.subcat == sub);

      // Crea una nueva versión del arreglo sin la propiedad "subcat"
      const newData = filteredData.map(({ subcat, ...rest }) => rest);

      // Guarda los datos filtrados en un nuevo archivo dentro de la carpeta de salida para las frases
      const outputFilePathPhrases = path.join(outputFolderPhrases, relativePath, nameFrases);
      
      fs.writeFileSync(outputFilePathPhrases, JSON.stringify(newData, null, 0));
      //fs.writeFileSync(outputFilePathPhrases, JSON.stringify(jsonData, null, 0));

      console.log(`Archivo guardado en frases: ${outputFilePathPhrases}`);

      }

      if (words) {


        // Guarda los datos sin filtrar en un nuevo archivo dentro de la carpeta de salida para las palabras
        
              // Filtra los elementos con subcat 
        if (copy){

          const outputFilePathWords = path.join(outputFolderWords, relativePath, file);
          fs.writeFileSync(outputFilePathWords, JSON.stringify(jsonData, null, 0));

          console.log(`Archivo guardado en palabras: ${outputFilePathWords}`);

        }else{
          const filteredDataWords = jsonData.filter(item => item.subcat !== sub);

          const outputFilePathWords = path.join(outputFolderWords, relativePath, file);
          fs.writeFileSync(outputFilePathWords, JSON.stringify(filteredDataWords, null, 0));
  
          console.log(`Archivo guardado en palabras: ${outputFilePathWords}`);
        }



    
      }
    }
  }
}

processFolder(inputFolder, '');
