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

//Rota para deletar noticias
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

// Rota para editar notícia
router.get('/editar/:id', async (req, res) => {
  // Verifique se o usuário está logado antes de permitir editar
  if (req.session.loggedin) {
      // Aqui você pode carregar os dados da notícia para edição, se necessário
      // Por exemplo, você pode buscar a notícia com o ID req.params.id e passá-la para a página de edição
      res.render('edit', { id: req.params.id });
  } else {
      res.redirect('/login');
  }
});

module.exports = router