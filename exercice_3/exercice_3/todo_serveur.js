const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];
let nextId = 1;
/* 
 la fonction array.map() permet de créer un nouveau tableau en appliquant 
 une fonction à chaque élément du tableau d'origine.
 Par exemple, si vous avez un tableau d'objets représentant des utilisateurs 
 et que vous souhaitez créer un nouveau tableau contenant uniquement les noms des utilisateurs,
 vous pouvez utiliser array.map() comme suit :
  const users = [ { name: 'Alice', age: 25 }, { name: 'Bob', age: 30 } ];
  const names = users.map(user => user.name);
  console.log(names); // ['Alice', 'Bob']
*/


/* 
  La fonction array.reduce() permet de réduire un tableau à une seule valeur en appliquant
  une fonction à chaque élément du tableau, en accumulant un résultat.
  Par exemple, si vous avez un tableau de nombres et que vous souhaitez calculer la somme de ces nombres,
  vous pouvez utiliser array.reduce() comme suit :
  const numbers = [1, 2, 3, 4];
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log(sum); // 10
*/

/* 
  La finction array.filter() permet de créer un nouveau tableau contenant uniquement les éléments
  qui satisfont une condition spécifiée.
  Par exemple, si vous avez un tableau de nombres et que vous souhaitez créer un nouveau tableau
  contenant uniquement les nombres pairs, vous pouvez utiliser array.filter() comme suit :
  const numbers = [1, 2, 3, 4, 5, 6];
  const evenNumbers = numbers.filter(number => number % 2 === 0);
  console.log(evenNumbers); // [2, 4, 6]
*/

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Todo List');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/new-task', (req, res) => {
  const { title, description, isDone } = req.body;

  if (!title || typeof isDone !== 'boolean') {
    return res.status(400).json({ error: 'Title and isDone are required' });
  }

  const newTask = { id: nextId++, title, description: description || '', isDone };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/update-task/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, isDone } = req.body;

  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (isDone !== undefined) task.isDone = isDone;

  res.json(task);
});

app.delete('/delete-task/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask[0]);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Todo List Server en écoute sur http://localhost:${port}`);
});
