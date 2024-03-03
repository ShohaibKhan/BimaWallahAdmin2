const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  // Enter your credentials
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage=getStorage(app);

module.exports = {db,storage};
