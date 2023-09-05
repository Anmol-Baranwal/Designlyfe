import { NextApiRequest, NextApiResponse } from 'next'
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  where,
  query,
  setDoc,
  getDoc,
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

const addUserToUserUpvotes = async (
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
      return { success: false, message: 'User not found' }
    }

    // Get the user's document reference from the query snapshot
    const userDocRef = querySnapshot.docs[0].ref

    // Update the 'upvotes' field with the user's ID
    const bookmarksCollectionRef = collection(userDocRef, 'bookmarks')

    await setDoc(doc(bookmarksCollectionRef, asset.name), asset)

    const assetDocRef = doc(bookmarksCollectionRef, asset.name)

    const assetDoc = await getDoc(assetDocRef)

    if (assetDoc.exists()) {
      const assetData = assetDoc.data()
      if (assetData && assetData.upvotes && assetData.upvotes[userId]) {
        delete assetData.upvotes[userId]
        await updateDoc(assetDocRef, { upvotes: assetData.upvotes })
      }
    }

    // await updateDoc(assetDocRef, {
    //   upvotes: {
    //     ...asset.upvotes,
    //     [userId]: null,
    //   },
    // })

    res
      .status(200)
      .json({ message: 'remove user id from bookmark upvote in users' })
  } catch (error) {
    console.error('Error removing user id to bookmark upvote in users:', error)
    return { success: false, message: 'Internal server error' }
  }
}

export default addUserToUserUpvotes
