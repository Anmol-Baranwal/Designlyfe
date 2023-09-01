import { NextApiRequest, NextApiResponse } from 'next'
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

const removeUserFromAssetBookmark = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, asset } = req.body

    const { type, author } = asset

    const subcollectionRef = collection(db, 'assets', type, author)

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

    // Update the asset's bookmarks to remove the user's ID
    await updateDoc(assetDocRef, {
      [`upvotes.${userId}`]: null, // Set to null to remove the user
    })

    res
      .status(200)
      .json({ message: 'User removed from asset bookmarks successfully' })
  } catch (error) {
    console.error('Error removing user from asset bookmarks:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default removeUserFromAssetBookmark
