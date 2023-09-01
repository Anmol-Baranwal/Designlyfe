import { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

const removeAssetFromUserBookmarks = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, asset } = req.body

    // Query the users collection to find the user's document using the userId
    const usersCollectionRef = collection(db, 'users')
    const querySnapshot = await getDocs(
      query(usersCollectionRef, where('userId', '==', userId))
    )

    if (querySnapshot.empty) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Get the user's document reference from the query snapshot
    const userDocRef = querySnapshot.docs[0].ref

    // Query the bookmarks subcollection within the user's document to find the asset
    const bookmarksCollectionRef = collection(userDocRef, 'bookmarks')
    const assetQuerySnapshot = await getDocs(
      query(bookmarksCollectionRef, where('name', '==', asset.name))
    )

    // Check if the asset is in the user's bookmarks
    if (assetQuerySnapshot.empty) {
      res.status(404).json({ message: 'Asset not found in user bookmarks' })
      return
    }

    // Get the document reference of the asset in the bookmarks collection
    const assetDocRef = assetQuerySnapshot.docs[0].ref

    // Delete the asset from the user's bookmarks
    await deleteDoc(assetDocRef)

    res
      .status(200)
      .json({ message: 'Asset removed from user bookmarks successfully' })
  } catch (error) {
    console.error('Error removing asset from user bookmarks:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default removeAssetFromUserBookmarks
