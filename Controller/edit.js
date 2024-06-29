const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Função para carregar uma notícia pelo ID
const loadNoticia = (id) => {
  const filePath = path.join(__dirname, `../data/${id}.json`);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } else {
    return null;
  }
};

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
