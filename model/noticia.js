const fs = require('fs').promises; 
const path = require('path');
let id = 1;
let noticias = [];

let noticia = {
    id: null,
    capa: null,
    titulo: null,
    tema: null,
    conteudo: null,
    resumo: null,
    autor: null,
    data: null,
    comentarios: []
}

const noticiasFolder = path.join(__dirname, '..', 'public', 'noticias');

module.exports = {
    async newNoticia(noticia){
        try{
            
            noticia.id = await geraId();

            const filePath = path.join(noticiasFolder, `${noticia.id}.json`);
            const jsonData = JSON.stringify(noticia, null, 2);
            
            await fs.writeFile(filePath, jsonData);
            
            console.log(noticia);

            return true;

        }catch(error){
            
            console.log(error.message);
            
            throw new Error(`Erro ao criar nova notícia: ${error.message}`);
        };
    },
    getListNoticias(){
        return noticias;
    },
    getNoticia(){
        return noticia;
    },
}

async function geraId() {
    try {
        const files = await fs.readdir(noticiasFolder);
        
        return files.length + 1;

    } catch (error) {
        console.log(error.message);
        
        throw new Error(`Erro ao obter próximo ID: ${error.message}`);
    }
}