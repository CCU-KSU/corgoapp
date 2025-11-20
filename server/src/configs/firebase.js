import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({});

export const auth = getAuth(app);

const dbName = process.env.FIREBASE_DB_NAME

export const db = getFirestore(app, dbName);