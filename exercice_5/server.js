const express = require('express');
const app = express();
const path = require('path');

function loggerMiddleware(req, res, next) {
  console.log('nouvelle requête entrante');
  next();
}

app.use(express.json());
app.use(loggerMiddleware);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/test', (req, res) => {
  res.json({ body: req.body });
});

app.listen(3000, () => console.log('Serveur Express démarré sur http://localhost:3000'));
