const express = require('express')
const { getNoticia, getListNoticias, newNoticia } = require('../model/noticia')
const router = express.Router()

router.get('/novanoticia', (req, res) => {
  if (req.session.loggedin) {
    res.render('novanoticia')
  } else {
    res.redirect('/login')
  }
})

router.post('/publicar', async (req, res) => {
  const noticia = {
    titulo: req.body.titulo,
    categoria: req.body.categoria,
    conteudo: req.body.conteudo,
    resumo: req.body.resumo,
    autor: req.body.autor,
    data: req.body.date
  }

  try {
    if (await newNoticia(noticia)) res.redirect('/home')
  } catch (error) {
    console.error('Erro ao publicar notícia:', error) // Log de erro

    res.status(500).send('Erro ao publicar notícia')
  }
})

module.exports = router
