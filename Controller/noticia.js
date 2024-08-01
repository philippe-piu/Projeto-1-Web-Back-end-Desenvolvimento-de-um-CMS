// Controller/noticia.js
const express = require('express');
const { getNoticia } = require('../model/noticia');
const router = express.Router();

// Rota para exibir uma notícia específica
router.get('/noticia/:id/:titulo', async (req, res) => {
  const noticiaId = req.params.id;
  try {
    const noticia = await getNoticia(noticiaId);
    if (noticia) {
      res.render('noticia', { noticia: noticia });
    } else {
      res.status(404).send('Notícia não encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    res.status(500).send('Erro ao buscar notícia');
  }
});

module.exports = router;