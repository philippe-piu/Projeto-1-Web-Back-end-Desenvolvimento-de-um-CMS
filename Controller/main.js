const express = require('express')
const router = express.Router()
const { getListNoticias } = require('../model/noticia');
//Rota Para Inicial do Projeto
router.get("/", (req, res) => {
  res.render("index", {noticias: getListNoticias()});
})

//Rota Para Login
router.get("/login", (req, res) => {
  res.render("login");
})

//Rota de Verificação de Login
router.post("/login", (req, res) =>{
  //Pega resquisição utilizando o body do email e da senha
  const {email, password} = req.body;
  //Se o email e a senha forem iguais ao passado no metodo post do formulario de login
  if(email === process.env.USER_EMAIL && password == process.env.USER_PASS){
    //Informa seção se torna verdadeira e o usuario está logado
    req.session.loggedin = true;
    //Redireciona para a página inicial de apo´s o login
    res.redirect("/home");
  }else{
    //Em caso de algum erro no email ou na senha aparece uma mensagem de erro na tela
    res.render('login', { error: 'Email ou Senha incorretos' });
  }
})

// Rota para logout
router.get('/logout', (req, res) => {
  //Sai da sessão de logado o usuario não se encontra mais logado
  req.session.destroy();
  //Manda o usuario devolta para página inicial do projeto
  res.redirect('/');
});

module.exports = router