import { getDb } from './firebase';
import type { Auth, User } from 'firebase/auth';
import type { Language } from './types';

// ---------------------------------------------------------------------------
// Hekim girişi — Firebase Authentication (e-posta + şifre).
//
// NEDEN: Eski giriş, istemci kodunda AÇIK YAZILI bir kullanıcı adı/şifre
// ('drbasri' / '542582') ve yalnızca bir localStorage bayrağıydı. Sayfanın
// kaynağını açan herkes şifreyi görebiliyordu ve Firestore tarafında hiçbir
// karşılığı yoktu; bu yüzden güvenlik kuralları randevu okumasını tamamen
// kapatmak zorunda kalmıştı — yani doktor kendi randevularını göremiyordu.
//
// Artık gerçek kimlik doğrulama var: giriş başarılı olduğunda Firestore
// kuralları (firestore.rules) `request.auth != null` koşuluyla randevuları
// okumaya ve yazı yönetimine izin verir.
//
// KURULUM (Firebase Console → Authentication):
//   1. Sign-in method → Email/Password → Enable
//   2. Users → Add user → doktorun e-postası + güçlü bir şifre
// ---------------------------------------------------------------------------

let authPromise: Promise<Auth> | null = null;

function getAuthInstance(): Promise<Auth> {
  if (!authPromise) {
    authPromise = (async () => {
      // getDb() firebase app'i başlatır; auth aynı app örneğini kullanır.
      await getDb();
      const [{ getApp }, { getAuth }] = await Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
      ]);
      return getAuth(getApp());
    })();
  }
  return authPromise;
}

export async function signInDoctor(email: string, password: string): Promise<User> {
  const [auth, { signInWithEmailAndPassword }] = await Promise.all([
    getAuthInstance(),
    import('firebase/auth'),
  ]);
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  return cred.user;
}

export async function signOutDoctor(): Promise<void> {
  const [auth, { signOut }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
  await signOut(auth);
}

/** Oturum durumunu dinler. Döndürdüğü fonksiyon aboneliği bitirir. */
export async function watchDoctorAuth(cb: (user: User | null) => void): Promise<() => void> {
  const [auth, { onAuthStateChanged }] = await Promise.all([
    getAuthInstance(),
    import('firebase/auth'),
  ]);
  return onAuthStateChanged(auth, cb);
}

/** Firebase hata kodlarını hastanın/doktorun anlayacağı metne çevirir. */
export function authErrorMessage(err: unknown, language: Language): string {
  const code = (err as { code?: string })?.code ?? '';
  const tr: Record<string, string> = {
    'auth/invalid-email': 'Geçersiz e-posta adresi.',
    'auth/invalid-credential': 'E-posta veya şifre hatalı.',
    'auth/wrong-password': 'E-posta veya şifre hatalı.',
    'auth/user-not-found': 'E-posta veya şifre hatalı.',
    'auth/too-many-requests': 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.',
    'auth/network-request-failed': 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
    'auth/operation-not-allowed': 'E-posta/şifre girişi Firebase Console’da etkinleştirilmemiş.',
  };
  const en: Record<string, string> = {
    'auth/invalid-email': 'Invalid e-mail address.',
    'auth/invalid-credential': 'Incorrect e-mail or password.',
    'auth/wrong-password': 'Incorrect e-mail or password.',
    'auth/user-not-found': 'Incorrect e-mail or password.',
    'auth/too-many-requests': 'Too many attempts. Please try again in a few minutes.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/operation-not-allowed': 'E-mail/password sign-in is not enabled in the Firebase Console.',
  };
  const table = language === 'TR' ? tr : en; // RU: İngilizce mesaj (yalnızca hekim paneli)
  return table[code] ?? (language === 'TR' ? 'Giriş yapılamadı.' : 'Sign-in failed.');
}
