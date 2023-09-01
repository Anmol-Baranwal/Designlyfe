import { NextApiRequest, NextApiResponse } from 'next'
import {
  doc,
  setDoc,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

const addAssetToUserBookmarks = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, asset } = req.body // Assuming userId is extracted from AuthContext

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

    // Create a 'bookmarks' subcollection within the user's document
    const bookmarksCollectionRef = collection(userDocRef, 'bookmarks')

    // Add the bookmarked asset to the user's bookmarks subcollection
    await setDoc(doc(bookmarksCollectionRef, asset.name), asset)

    res.status(200).json({ message: 'Asset bookmarked successfully' })
  } catch (error) {
    console.error('Error adding bookmark:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default addAssetToUserBookmarks
