const express = require('express');
const { getNoticia, getListNoticias, newNoticia} = require('../model/noticia');
const router = express.Router();



router.get('/home', (req, res) => {
    //Se o usuario estiver logado ele pode acessar as página de logado
    if (req.session.loggedin) {
      res.render('home', {noticias: getListNoticias()})
    } else {
      //Se o usuario não estiver logado ele é redirecionado ao login
      res.redirect('/login');
    }
});

module.exports = router