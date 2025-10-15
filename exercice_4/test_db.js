
const { getUsers, insert_user } = require('./db_utils');

console.log('Lecture des utilisateurs existants :');
getUsers((err, users) => {
  if (err) return console.error('Erreur getUsers:', err);
  console.log(users);

  insert_user({ email: 'nouveau@test.com' }, (err, user) => {
    if (err) return console.error('Erreur insert_user:', err);
    console.log('Utilisateur inséré :', user);
    getUsers((err, users) => {
      if (err) return console.error('Erreur getUsers:', err);
      console.log('Utilisateurs après insertion :', users);
    });
  });
});
