const express = require('express');
const { newNoticia } = require('../model/noticia');
const router = express.Router();
const upload = require('../utils/multerConfig');

router.get('/novanoticia', (req, res)=>{
    if(req.session.loggedin) {
        res.render('novanoticia');
    }else{
        res.redirect('/login');
    }
});

router.post('/publicar', upload.single('image'), async (req, res) =>{
    const { titulo, categoria, conteudo, resumo, autor, date } = req.body;
    const image = req.file ? req.file.filename : null;
    

    const noticia = {
      titulo,
      categoria,
      conteudo,
      resumo,
      autor,
      date,
      image
    }

    try{
        if(await newNoticia(noticia))
            res.redirect('/home');

    }catch(error){
      console.error('Erro ao publicar notícia:', error); // Log de erro
      
      res.status(500).send('Erro ao publicar notícia');
    };

});

  module.exports = router