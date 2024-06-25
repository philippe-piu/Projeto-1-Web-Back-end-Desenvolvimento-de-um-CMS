const express = require('express');
const { getNoticia, getListNoticias, newNoticia} = require('../model/noticia');
const router = express.Router();



router.get('/home', (req, res) => {
    //Se o usuario estiver logado ele pode acessar as página de logado
    if (req.session.loggedin) {
      res.render('home', {noticias: getListNoticias()})
    } else {
      //Se o usuario não estiver logado ele é redirecionado ao login
      res.redirect('/login');
    }
});

router.post('/publicar', (req, res) =>{
  const noticia = {
    titulo: req.body.titulo,
    categoria: req.body.categoria,
    conteudo: req.body.conteudo,
    resumo: req.body.resumo,
    autor: req.body.autor,
    data: req.body.date,
  }

  newNoticia(noticia);
  res.redirect('/home');
})

module.exports = router