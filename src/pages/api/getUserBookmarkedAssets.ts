import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../firebaseConfig'
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from 'firebase/firestore'

const getUserBookmarkedAssets = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId } = req.query

    // Query the users collection to find the user's document using the userId
    const usersCollectionRef = collection(db, 'users')
    const userQuery = query(usersCollectionRef, where('userId', '==', userId))
    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Get the user's document reference from the query snapshot
    const userDocRef = querySnapshot.docs[0].ref

    // Query the 'bookmarks' subcollection to get all bookmarked assets
    const bookmarksCollectionRef = collection(userDocRef, 'bookmarks')
    const bookmarksQuerySnapshot = await getDocs(bookmarksCollectionRef)

    // Extract the bookmarked assets from the query snapshot
    const bookmarkedAssets: DocumentData[] = []
    bookmarksQuerySnapshot.forEach((doc) => {
      bookmarkedAssets.push(doc.data())
    })

    res.status(200).json({ bookmarkedAssets })
  } catch (error) {
    console.error('Error fetching bookmarked assets:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default getUserBookmarkedAssets
