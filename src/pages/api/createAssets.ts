import { NextApiRequest, NextApiResponse } from 'next';
import { icons, illustrations } from '../../../data/assets';
import { getFirestore, doc, setDoc } from 'firebase/firestore';  // collection, addDoc

// Initialize Firebase if you haven't already
const db = getFirestore();

const createAssets = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Clear existing data (if any)
    await setDoc(doc(db, 'assets', 'icons'), {});
    await setDoc(doc(db, 'assets', 'illustrations'), {});

    for (const icon of icons) {
      const { author, ...rest } = icon;
      const iconDocRef = doc(db, 'assets/icons', author, icon.name.toLowerCase());
      await setDoc(iconDocRef, { ...rest, category: 'icons' });
    }

    for (const illustration of illustrations) {
      const { author, ...rest } = illustration;
      const illustrationDocRef = doc(
        db,
        'assets/illustrations',
        author,
        illustration.name.toLowerCase()
      );
      await setDoc(illustrationDocRef, { ...rest, category: 'illustrations' });
    }

    res.status(200).json({ message: 'Assets created successfully' });
  } catch (error) {
    console.error('Error creating assets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default createAssets;
