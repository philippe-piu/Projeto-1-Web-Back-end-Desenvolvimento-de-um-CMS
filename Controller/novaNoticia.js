const express = require('express');
const { getNoticia, getListNoticias, newNoticia} = require('../model/noticia');
const router = express.Router();

router.get('novanoticia', (req, res)=>{
    if(req.session.loggedin) {
        res.render('novanoticia');
    }else{
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
  });

  module.exports = router