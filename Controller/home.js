const express = require('express');
const { getListNoticias, deleteNoticia } = require('../model/noticia')
const router = express.Router();



router.get('/home', async (req, res) => {
    //Se o usuario estiver logado ele pode acessar as página de logado
    if (req.session.loggedin) {
      let noticias = await getListNoticias();
      
      if(noticias == null){
        res.render('home');
      }else{
        res.render('home', {noticias: noticias});
      }
      
    } else {
      //Se o usuario não estiver logado ele é redirecionado ao login
      res.redirect('/login');
    }
});

router.post('/deletar', async (req, res) => {  // Nova rota para deletar uma notícia
  const { id } = req.body;
  try {
      await deleteNoticia(id);
      res.redirect('/home');
  } catch (error) {
      console.error('Erro ao deletar notícia:', error); // Log de erro
      res.status(500).send('Erro ao deletar notícia');
  }
});

module.exports = router