const express = require('express');
const { getListNoticias, deleteNoticia } = require('../model/noticia');
const { loadNoticia } = require('../utils/noticiaLoader'); // Importa a função loadNoticia do utilitário de notícias
const router = express.Router();

router.get('/home', async (req, res) => {
  // Se o usuario estiver logado ele pode acessar as páginas de logado
  if (req.session.loggedin) {
    let noticias = await getListNoticias();
    
    if(noticias == null){
      res.render('home');
    }else{
      res.render('home', {noticias: noticias});
    }
    
  } else {
    // Se o usuario não estiver logado ele é redirecionado ao login
    res.redirect('/login');
  }
});

// Rota para deletar noticias
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
router.get('/editar/:id', (req, res) => {
  // Verifique se o usuário está logado antes de permitir editar
  if (req.session.loggedin) {
    const id = req.params.id;
    const noticia = loadNoticia(id);
    if (noticia) {
      res.render('edit', noticia); // Passar a notícia diretamente para o template
    } else {
      res.status(404).send('Notícia não encontrada');
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
