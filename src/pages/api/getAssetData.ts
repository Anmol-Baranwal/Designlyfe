import { NextApiRequest, NextApiResponse } from 'next'
import {
  query,
  getDocs,
  collection,
  where,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { brandIcons, brandIllustrations } from '../../../data/assets'

export default async function getAssetsData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const option = req.query.sidebarOption || 'Try if U Can'

      const iconsQuery = query(
        collection(db, 'assets'),
        where('name', '==', option)
      )
      const iconsSnapshot = await getDocs(iconsQuery)

      if (!iconsSnapshot.empty) {
        const iconsDoc = iconsSnapshot.docs[0]

        const brandsToFetch =
          option === 'Icons' ? brandIcons.brand : brandIllustrations.brand

        const result: Record<string, DocumentData[]> = {}

        for (const brand of brandsToFetch) {
          const brandData = await getSubcollectionData(iconsDoc.ref, brand)
          result[brand] = brandData
        }

        res.status(200).json(result)
      } else {
        res.status(404).json({ message: 'Icons document not found' })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

async function getSubcollectionData(
  docRef: DocumentReference<DocumentData>,
  subcollectionName: string
) {
  const data: DocumentData[] = []
  const subcollectionQuery = query(collection(docRef, subcollectionName))
  const subcollectionSnapshot = await getDocs(subcollectionQuery)

  subcollectionSnapshot.forEach((doc) => {
    data.push(doc.data())
  })

  return data
}
