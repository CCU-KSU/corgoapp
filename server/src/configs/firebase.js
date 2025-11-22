import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.GOOGLE_CLOUD_PROJECT;

const app = initializeApp({ projectId: projectId });

export const auth = getAuth(app);

export const db = getFirestore(app);