// pages/api/incrementShareCount.ts
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

const incrementShareCount = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { asset } = req.body
    const { type, author } = asset

    const assetQuery = query(
      collection(db, 'assets', type, author),
      where('name', '==', asset.name)
    )
    const assetQuerySnapshot = await getDocs(assetQuery)

    // Check if the asset exists
    if (assetQuerySnapshot.empty) {
      res.status(404).json({ message: 'Asset not found' })
      return
    }

    // Get the matched asset document reference
    const assetDocSnapshot = assetQuerySnapshot.docs[0]
    const assetDocRef = doc(db, 'assets', type, author, assetDocSnapshot.id)

    await updateDoc(assetDocRef, {
      shareCount: (assetDocSnapshot.data().shareCount || 0) + 1,
    })

    res.status(200).json({ message: 'Share count incremented successfully' })
  } catch (error) {
    console.error('Error incrementing share count:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default incrementShareCount
