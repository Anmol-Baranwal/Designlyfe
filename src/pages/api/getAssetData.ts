import { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

export default async function getAssetData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Access the "assets" collection
      const assetsCollection = collection(db, 'assets')

      const querySnapshot = await getDocs(assetsCollection)

      const assetsData = querySnapshot.docs.map((doc) => doc.data())

      res.status(200).json(assetsData)
    } catch (error) {
      console.error('Error fetching assets:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
