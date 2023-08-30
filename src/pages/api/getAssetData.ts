import { NextApiRequest, NextApiResponse } from 'next'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

export default async function getIconsData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const type = req.query.type // "Icons" or "Illustrations"

      // Retrieve the document under the asset collection where the name field contains the value "Icons"
      const assetQuery = query(
        collection(db, 'assets'),
        where('name', '==', 'Icons')
      )
      const assetSnapshot = await getDocs(assetQuery)

      if (assetSnapshot.empty) {
        res.status(404).json({ message: 'Document not found' })
      } else {
        // Print the document data in the console
        assetSnapshot.forEach((doc) => {
          console.log(doc.data())
        })

        res.status(200).json({ message: 'Document retrieved successfully' })
      }
    } catch (error) {
      console.error('Error fetching document:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
