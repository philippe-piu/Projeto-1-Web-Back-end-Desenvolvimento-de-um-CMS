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
}