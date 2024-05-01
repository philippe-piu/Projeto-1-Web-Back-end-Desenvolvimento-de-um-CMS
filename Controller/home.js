const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    //Se o usuario estiver logado ele pode acessar as página de logado
    if (req.session.loggedin) {
      res.render('home');
    } else {
      //Se o usuario não estiver logado ele é redirecionado ao login
      res.redirect('/login');
    }
});

module.exports = router