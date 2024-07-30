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
    async getNoticia(noticiaId) {
        try {
            // Criando o caminho completo para o arquivo JSON da notícia
            const filePath = path.join(noticiasFolder, `${noticiaId}.json`);
            // Lê o conteúdo do arquivo de forma assíncrona, aguardando a conclusão
            const data = await fs.readFile(filePath, 'utf-8');
           // Converte o conteúdo do arquivo de JSON para objeto
            return JSON.parse(data);
        } catch (error) {
            //Captura e lança um erro com uma mensagem personalizada, caso ocorra um problema
            throw new Error(`Erro ao obter notícia: ${error.message}`);
        }
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

async function readLastFile(directoryPath) {
    try {
        const files = fs1.readdirSync(directoryPath);

        // Filtra apenas arquivos com a extensão .json
        const jsonFiles = files.filter(file => fs1.lstatSync(path.join(directoryPath, file)).isFile() && path.extname(file) === '.json');
        
        // Ordena os arquivos em ordem alfabética
        jsonFiles.sort();

        // Pega o último arquivo na lista ordenada
        const lastFile = jsonFiles.length > 0 ? jsonFiles[jsonFiles.length - 1] : null;

        if (lastFile) {
            // Remove a extensão .json
            return path.basename(lastFile, '.json');
        } else {
            return null;
        }
    } catch (err) {
        console.error('Erro ao ler o diretório:', err);
        return null;
    }
}


async function geraId() {
    try {
        const lastFile = await readLastFile(noticiasFolder);
        let newId;
        if (lastFile) {
            newId = parseInt(lastFile, 10) + 1;
            console.log('Novo ID:', newId);
        } else {
            newId = 1;
            console.log('Novo ID:', newId);
        }
        return newId;
    } catch (err) {
        console.error('Erro ao ler o diretório:', err);
        return null;
    }
}
