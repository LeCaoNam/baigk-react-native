const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

initializeApp({ credential: cert(require('./serviceAccountKey.json')) });

getFirestore().collection('users').get().then((snap) => {
  const users = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  fs.writeFileSync('users.json', JSON.stringify({ users }, null, 2));
  console.log('Da xuat', users.length, 'nguoi dung ra users.json');
  process.exit(0);
}).catch((e) => {
  console.error('Loi:', e.message);
  process.exit(1);
});