const express = require('express')
const { getNoticia, getListNoticias, newNoticia } = require('../model/noticia')
const router = express.Router()

router.get('/home', async (req, res) => {
  //Se o usuario estiver logado ele pode acessar as página de logado
  if (req.session.loggedin) {
    let noticias = await getListNoticias()

    if (noticias == null) {
      res.render('home')
    } else {
      res.render('home', { noticias: noticias })
    }
  } else {
    //Se o usuario não estiver logado ele é redirecionado ao login
    res.redirect('/login')
  }
})

module.exports = router
