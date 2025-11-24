import * as functions from "firebase-functions/v1";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";

const app = admin.initializeApp();
const db = admin.firestore();

// export const getAppRecommendations = functions.https.onRequest(async (req, res) => {
//     if (req.method !== "POST") {
//         return res.status(405).send({ error: "Method Not Allowed. Use POST." });
//     }

//     const { userId } = req.body;

//     if (!userId) {
//         console.error("Missing userId in request body.");
//         return res.status(400).send({ error: "Missing userId parameter." });
//     }

//     const norm = (str) => String(str || "").trim().toLowerCase();

//     try {
//         const userSnapshot = await db.collection("users")
//             .doc(userId)
//             .get("interests");
//         const interestsSnapshot = userSnapshot.data().interests;
//         const normalized = interestsSnapshot.map(norm);

//         const appsSnapshot = await db.collection("appCatalog").get();

//         const appRecommendations = [];

//         appsSnapshot.forEach((doc) => {
//             const data = doc.data();
//             const appTags = (data.tags || []).map(norm);

//             const match = appTags.some((tag) => normalized.includes(tag));
//             if (match) {
//                 appRecommendations.push({
//                     appId: doc.id,
//                     name: data.name,
//                     tags: data.tags,
//                 });
//             }
//         });

//         res.status(200).json({ appRecommendations: appRecommendations });
//     } catch (error) {
//         console.error("Failed to generate recommendations: ", error);
//         res.status(500).send({ error: "Failed to generate recommendations:" });
//     }
// });

export const cleanupUserDataOnDelete = functions.auth.user().onDelete(async (user) => {
    const { uid } = user;

    try {
        const profileRef = db.collection('users').doc(uid);
        await profileRef.delete();
        console.log(`Successfully deleted main profile document for user ${uid}.`);
        return { success: true };
    } catch (error) {
        console.error(`ERROR cleaning up data for user ${uid}:`, error);
        throw new Error(`Data cleanup failed for user ${uid}: ${error.message}`);
    }
});

export const hitMe = functions.https.onRequest(async (req, res) => {
    res.status(200).json({ message: "Hello World"});
});