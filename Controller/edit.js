const express = require('express');
const fs = require('fs');
const path = require('path');
const { loadNoticia } = require('../utils/noticiaLoader');
const router = express.Router();

// Função para salvar uma notícia pelo ID
const saveNoticia = (id, noticia) => {
  const filePath = path.join(__dirname, `../data/${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(noticia, null, 2));
};

// Rota para renderizar a página de edição
router.get('/editar/:id', (req, res) => {
  const id = req.params.id;
  const noticia = loadNoticia(id);
  if (noticia) {
    res.render('edit', noticia);
  } else {
    res.status(404).send('Notícia não encontrada');
  }
});

// Rota para processar a edição da notícia
router.post('/editar/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const noticia = loadNoticia(id);

  if (noticia) {
    const updatedNoticia = { ...noticia, ...updatedData };
    saveNoticia(id, updatedNoticia);
    res.redirect('/'); // Redirecione para a página principal após a edição
  } else {
    res.status(404).send('Notícia não encontrada');
  }
});

module.exports = router;
