import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";

const config = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
  : null;

const app =
  getApps().length > 0
    ? getApp()
    : config
    ? initializeApp(config)
    : null;

const db = app ? getFirestore(app) : null;

export const FREE_LIMIT = 3;

export async function getUsage(userId: string) {
  if (!db) return { count: 0 };
  const ref = doc(db, "usage", "sales-agent", "users", userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { count: 0 });
    return { count: 0 };
  }
  return { count: snap.data().count || 0 };
}

export async function incrementUsage(userId: string) {
  if (!db) return;
  const ref = doc(db, "usage", "sales-agent", "users", userId);
  await updateDoc(ref, { count: increment(1) });
}
