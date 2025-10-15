const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/some-html', (req, res) => {
    res.send('<html><body><h1>bonjour html</h1></body></html>');
  });

app.get('/some-json', (req, res) => {
   
    const data = {
      age: 22,
      nom: 'Jane'
    };

    res.json(data);
})

app.get('/some-json2', (req, res) => {

    console.log('Headers:', req.headers);
  
    console.log('Body:', req.body);

    const data = {
      age: 22,
      nom: 'Jane',
    };
    res.json(data);
  });

app.get('/transaction', (req, res) => {
    const transactions = [100, 2000, 3000];
  
    res.json(transactions);
  });

  app.get('/exo-query-string', (req, res) => {
    console.log('Query:', req.query);
 
    const age = req.query.age;
    const name = req.query.name
  
   
    if (age) {
      res.send(`<html><body><h1>L'âge est ${age} ${name}</h1></body></html>`);
    } else {
      res.send('Hello');
    }
  });

  app.get('/get-user/:userId', (req, res) => {
   
    const userId = req.params.userId;
  
    // Afficher l'id dans la console
    console.log('User ID:', userId);
  
    // Envoyer une réponse au client
    res.send(`L'ID de l'utilisateur est : ${userId}`);
  });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
