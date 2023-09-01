import { NextApiRequest, NextApiResponse } from 'next'
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

const addUserToAssetBookmark = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, asset } = req.body

    const { type, author } = asset

    // Get the appropriate subcollection reference based on the asset type and author
    const subcollectionRef = collection(db, 'assets', type, author)

    // Query the subcollection to find the document with the asset name
    const assetQuery = query(subcollectionRef, where('name', '==', asset.name))
    const assetQuerySnapshot = await getDocs(assetQuery)

    // Check if the asset exists
    if (assetQuerySnapshot.empty) {
      res.status(404).json({ message: 'Asset not found' })
      return
    }

    // Get the matched asset document reference
    const assetDocSnapshot = assetQuerySnapshot.docs[0]
    const assetDocRef = doc(db, 'assets', type, author, assetDocSnapshot.id)

    // Update the asset's upvotes with the user's ID
    await setDoc(assetDocRef, {
      ...assetDocSnapshot.data(), // Keep existing data
      upvotes: {
        ...assetDocSnapshot.data().upvotes,
        [userId]: true,
      },
    })

    res
      .status(200)
      .json({ message: 'User added to asset bookmarks successfully' })
  } catch (error) {
    console.error('Error adding user to asset bookmarks:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default addUserToAssetBookmark
