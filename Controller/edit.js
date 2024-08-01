const express = require('express');
const fs = require('fs');
const path = require('path');
const { loadNoticia } = require('../utils/noticiaLoader');
const router = express.Router();
const multer = require('multer'); // Importe o multer
const upload = require('../utils/multerConfig'); // Importe a configuração do multer

// Função para salvar uma notícia pelo ID
const saveNoticia = (id, noticia) => {
  const filePath = path.join(__dirname, `../data/${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(noticia, null, 2));
};

// Rota para renderizar a página de edição
router.get('/editar/:id', (req, res) => {
  const id = req.params.id;
  const noticia = loadNoticia(id);

  if (req.session.loggedin){
    if (noticia) {
      res.render('edit', noticia);
    } else {
      res.status(404).send('Notícia não encontrada');
    }
  } else {
    res.redirect('/login');
  }
});

// Rota para processar a edição da notícia
router.post('/editar/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const noticia = loadNoticia(id);

  if (noticia) {
    // Atualize os dados da notícia com os dados enviados
    const updatedNoticia = { ...noticia, ...updatedData };
    
    // Se houver uma nova imagem enviada, atualize o nome do arquivo na notícia
    if (req.file) {
      updatedNoticia.image = req.file.filename;
    }

    // Salve a notícia atualizada
    saveNoticia(id, updatedNoticia);

    res.redirect('/home'); // Redirecione para a página principal após a edição
  } else {
    res.status(404).send('Notícia não encontrada');
  }
});

module.exports = router;
