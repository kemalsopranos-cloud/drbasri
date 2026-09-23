import { getDb } from './firebase';

/**
 * Firestore'u ve kullanılan fonksiyonları TEK çağrıda tembel yükler.
 *
 *   const { db, doc, setDoc } = await firestore();
 *   await setDoc(doc(db, 'appointments', id), data);
 *
 * Böylece firebase paketi ilk açılışta değil, yalnızca yazma/okuma anında
 * indirilir (bkz. src/firebase.ts'teki performans notu).
 */
export async function firestore() {
  const [db, fs] = await Promise.all([getDb(), import('firebase/firestore')]);
  return { db, ...fs };
}
