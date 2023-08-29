import { NextApiRequest, NextApiResponse } from 'next'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

export default async function getAssetData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const selectedSidebarOption = req.query.category as string

      const assetsCollection = collection(db, 'assets') // Access the "assets" collection

      // Create a query to filter documents based on the selected category
      const querySnapshot = await getDocs(
        query(assetsCollection, where('category', '==', selectedSidebarOption))
      )

      const assetsData = querySnapshot.docs.map((doc) => doc.data()) // Extract the asset data

      res.status(200).json(assetsData)
    } catch (error) {
      console.error('Error fetching assets:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
