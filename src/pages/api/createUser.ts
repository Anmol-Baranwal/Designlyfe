import { getFirestore, collection, doc, getDoc, addDoc } from "firebase/firestore";
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
      const userDocRef = doc(db, collectionName, data.userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        // User already exists
        res.status(400).json({ success: false, error: "User already exists" });
      } else {
        // Create a new document in the specified collection
        const newDocRef = await addDoc(collection(db, collectionName), {
          name: "",              // Set name to empty string
          email: data.email
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