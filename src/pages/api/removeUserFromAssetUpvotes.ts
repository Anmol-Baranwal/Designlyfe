import { NextApiRequest, NextApiResponse } from 'next'
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
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

    // Get the current upvotes object
    const currentUpvotes = assetDocSnapshot.data().upvotes || {}

    // Remove the user's ID from the asset's upvotes
    if (currentUpvotes[userId]) {
      delete currentUpvotes[userId]

      // Update the asset's upvotes with the modified object
      await updateDoc(assetDocRef, {
        upvotes: currentUpvotes,
      })
    }
    // Update the asset's bookmarks to remove the user's ID
    // await updateDoc(assetDocRef, {
    //   [`upvotes.${userId}`]: null, // Set to null to remove the user
    // })

    const updatedAssetDoc = await getDoc(assetDocRef)

    if (!updatedAssetDoc.exists()) {
      res.status(404).json({ message: 'Asset document not found' })
      return
    }

    const upvotes = updatedAssetDoc.data().upvotes || {}
    const upvoteCount = Object.keys(upvotes).length

    res.status(200).json({
      message: 'User removed from asset upvotes successfully',
      upvoteCount,
    })
  } catch (error) {
    console.error('Error removing user from asset upvotes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default removeUserFromAssetBookmark
