import type { Firestore } from 'firebase/firestore';

// ---------------------------------------------------------------------------
// PERFORMANS (23 Eyl 2026): Firebase artık TEMBEL yüklenir.
//
// Eskiden `db` modül seviyesinde dışa aktarılıyordu ve App.tsx onu statik
// import ettiği için firebase+firestore (~750 KB) ANA SAYFANIN ilk JS
// paketine giriyordu. Mobilde ölçüldü: 1.1 MB paket ve ana sayfa hiç
// ihtiyaç duymadığı hâlde firestore.googleapis.com'a istek.
//
// Artık yalnızca gerçekten gerekli olduğunda (randevu gönderimi, blog yazısı
// ekleme, hekim paneli) indirilir. Çağrı biçimi (bkz. src/firestore.ts):
//   const { db, doc, setDoc } = await firestore();
//
// ⚠️ Bu dosyadan STATİK `import { db }` geri EKLEME — paketi yeniden şişirir.
// ---------------------------------------------------------------------------

const firebaseConfig = {
  projectId: "gen-lang-client-0824204549",
  appId: "1:805996355962:web:26ed1615af7987467c36c3",
  apiKey: "AIzaSyCAZBkYTH5gL_y-ytqDJ6ysy3Vdpjv_3SU",
  authDomain: "gen-lang-client-0824204549.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-profdrbasriakrol-1ca8d888-0bab-4300-ba4f-e2b11399ca55",
  storageBucket: "gen-lang-client-0824204549.firebasestorage.app",
  messagingSenderId: "805996355962",
  measurementId: "",
  oAuthClientId: "805996355962-bnfc3ops6dklobt5c2qaejdoh14rgpj2.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

let dbPromise: Promise<Firestore> | null = null;

/** Firestore örneğini (gerekirse indirerek) döndürür; yalnızca bir kez başlatılır. */
export function getDb(): Promise<Firestore> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const [{ initializeApp }, { initializeFirestore }] = await Promise.all([
        import('firebase/app'),
        import('firebase/firestore'),
      ]);
      const app = initializeApp(firebaseConfig);
      return initializeFirestore(app, {}, firebaseConfig.firestoreDatabaseId || '(default)');
    })();
  }
  return dbPromise;
}
