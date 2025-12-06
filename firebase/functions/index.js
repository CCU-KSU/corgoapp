import * as functions from "firebase-functions/v1";
import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const cleanupUserDataOnDelete = functions
    .auth.user()
    .onDelete(async (user) => {
      const {uid} = user;

      try {
        const profileRef = db.collection("users").doc(uid);
        await profileRef.delete();
        // Delete all nested collections and their documents
        const collections = await profileRef.listCollections();
        for (const collectionRef of collections) {
          const docs = await collectionRef.listDocuments();
          for (const docRef of docs) {
            await docRef.delete();
          }
        }
        console.log(
            `Deleted profile document & nested collection for user ${uid}`,
        );
        return {success: true};
      } catch (error) {
        console.error(`ERROR cleaning up data for user ${uid}:`, error);
        throw new Error(
            `Data cleanup failed for user ${uid}: ${error.message}`,
        );
      }
    });

export const hitMe = functions.https.onRequest(async (req, res) => {
  res.status(200).json({message: "Hello World"});
});
