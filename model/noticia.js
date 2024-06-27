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
    
    async deleteNoticia(id) {  // Nova função para deletar uma notícia pelo ID
        try {
            const filePath = path.join(noticiasFolder, `${id}.json`);  // Cria o caminho para o arquivo a ser deletado
            await fs.unlink(filePath);  // Deleta o arquivo
            console.log(`Notícia ${id} deletada com sucesso.`);
            return true;
        } catch (error) {
            console.log(error.message);
            throw new Error(`Erro ao deletar notícia: ${error.message}`);
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