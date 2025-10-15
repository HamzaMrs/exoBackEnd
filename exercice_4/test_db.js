const { getUsers, insert_user } = require('./db_utils');

console.log('dbuser =', process.env.dbuser);
console.log('dbpwd  =', process.env.dbpwd ? '***' : '(vide)');
console.log('dbname =', process.env.dbname);

if (!process.env.dbuser || !process.env.dbpwd || !process.env.dbname) {
  console.error('Erreur : il manque une variable d\'environnement (dbuser, dbpwd ou dbname)');
  process.exit(1);
}

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

console.log('DBUSER =', process.env.DBUSER);
console.log('DBPWD  =', process.env.DBPWD ? '***' : '(vide)');
console.log('DBNAME =', process.env.DBNAME);