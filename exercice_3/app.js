const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/data', (req, res) => {
  
  console.log('Request Body:', req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Echo serveur en écoute sur http://localhost:${port}`);
});