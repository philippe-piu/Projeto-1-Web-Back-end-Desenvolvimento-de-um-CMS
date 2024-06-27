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

const noticiasFolder = path.join(__dirname, '..', 'data');

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
    async getListNoticias() {
        try {
            const arquivos = await fs.readdir(noticiasFolder);
            const noticias = await Promise.all(arquivos.map(async file => {
                const filePath = path.join(noticiasFolder, file);
                const data = await fs.readFile(filePath, 'utf-8');
                return JSON.parse(data);
            }));
            if(noticias.length > 0){
                return noticias;
            }else{
                return null;
            }
        } catch (error) {
            throw new Error(`Erro ao listar notícias: ${error.message}`);
        }
    },
    getNoticia(){
        return noticia;
    },
    
    deleteNoticia(tituloDel){
        let id = -1
        for (let i = 0; i < noticias.length; i++){
            if(noticias[i].titulo == tituloDel){
                id = noticias[i].id
                break
            }
        }
    
        if (id !== -1) {
            noticias.splice(id, 1);
            for (let i = id; i < noticias.length; i++) {
                noticias[i].id -= 1;
            }
        
            console.log("Valor excluído com sucesso!");
        } else {
            console.log("Valor não encontrado na lista.");
        }
    }
    
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