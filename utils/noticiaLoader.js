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

module.exports = { loadNoticia };
