const express = require('express');
const app = express();
const path = require('path');

function loggerMiddleware(req, res, next) {
  console.log('nouvelle requête entrante, req.body =', req.body);
  next();
}



app.use(express.json());
app.use(loggerMiddleware);

app.use(express.static(path.join(__dirname, 'templates')));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/test', (req, res) => {
  res.json({ body: req.body });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.listen(3000, () => console.log('Serveur Express démarré sur http://localhost:3000'));
