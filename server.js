const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/new-task', (req, res) => {
  const { title, description, isDone } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Le titre et la description sont obligatoires.' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    isDone: isDone || false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/update-task/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, isDone } = req.body;

  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (isDone !== undefined) task.isDone = isDone;

  res.json(task);
});

app.delete('/delete-task/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }

  const deletedTask = tasks.splice(index, 1)[0];
  res.json({ message: 'Tâche supprimée avec succès.', deletedTask });
});

app.get('/', (req, res) => {
  res.send('✅ Serveur Todo List opérationnel');
});

app.listen(3000, () => {
  console.log('✅ Serveur lancé sur http://localhost:3000');
});
