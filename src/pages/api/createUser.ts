import { getFirestore, collection, doc, getDoc, addDoc, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../../firebaseConfig";
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  error: string | null;
  docId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { collectionName, data } = req.body;

      const db = getFirestore(firebaseApp);

      // Check if the user already exists in the Firestore collection
      const usersCollectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(usersCollectionRef);
      const existingUser = querySnapshot.docs.find(
        (doc) => doc.data().userId === data.userId
      );

      if (existingUser) {
        // User already exists
        res.status(400).json({ success: false, error: "User already exists" });
      } else {
        // Create a new document in the specified collection
        const newDocRef = await addDoc(collection(db, collectionName), {
          userId: data.userId,
          name: "",              // Set name to empty string
          email: data.email,
          username: data.username || "",
          avatarUrl: data.avatarUrl || "",
        });

        // Retrieve the auto-generated document ID
        const docId = newDocRef.id;

        res.status(200).json({
            success: true, docId,
            error: null
        });
      }
    } catch (error: any) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, error: "Failed to create collection" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}