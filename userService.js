import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  getDocs, query, where, onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

const col = collection(db, 'users');

export const listenUsers = (cb) =>
  onSnapshot(col, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));

export const addUser = (u) => addDoc(col, u);
export const updateUser = (id, u) => updateDoc(doc(db, 'users', id), u);
export const deleteUser = (id) => deleteDoc(doc(db, 'users', id));

export async function emailExists(email) {
  const s = await getDocs(query(col, where('email', '==', email)));
  return !s.empty;
}

export async function login(email, pass) {
  const s = await getDocs(
    query(col, where('email', '==', email), where('matkhau', '==', pass))
  );
  return !s.empty;
}