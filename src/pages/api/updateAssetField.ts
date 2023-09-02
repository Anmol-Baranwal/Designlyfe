// api/updateAssetField.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseApp } from '../../../firebaseConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { assetPath, fieldToUpdate, newValue } = req.body;
      const db = getFirestore(firebaseApp);
      const assetDocRef = doc(db, assetPath);

      await setDoc(
        assetDocRef,
        { [fieldToUpdate]: newValue },
        { merge: true }
      );

      res.status(200).json({ success: true, message: 'Asset field updated' });
    } catch (error) {
      console.error('Error updating asset field:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
