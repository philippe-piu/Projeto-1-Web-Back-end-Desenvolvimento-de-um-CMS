let id = 0;
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

module.exports = {
    newNoticia(noticia){
        noticias.push(noticia);
    },
    getListNoticias(){
        return noticias;
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