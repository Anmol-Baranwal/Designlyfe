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

export interface brandInterface {
  brand: string[]
}

export const brandIcons: brandInterface = {
  brand: ['Drawkit', 'Getillustrations'],
}

export const brandIllustrations: brandInterface = {
  brand: [
    'Craftwork',
    'Drawer',
    'Drawkit',
    'Getillustrations',
    'Growww',
    'Ls Graphics',
  ],
}

export default async function getAssetsData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Query the Icons document
      const option = req.query.sidebarOption || 'Illustrations'

      const iconsQuery = query(
        collection(db, 'assets'),
        where('name', '==', option)
      )
      const iconsSnapshot = await getDocs(iconsQuery)

      if (!iconsSnapshot.empty) {
        const iconsDoc = iconsSnapshot.docs[0]

        if (option === 'Icons') {
          const drawkitData = await getSubcollectionData(
            iconsDoc.ref,
            'Drawkit'
          )
          const getIllustrationsData = await getSubcollectionData(
            iconsDoc.ref,
            'Getillustrations'
          )

          const result = {
            drawkit: drawkitData,
            getIllustrations: getIllustrationsData,
          }
          res.status(200).json(result)
        } else if (option === 'Illustrations') {
          const craftworkData = await getSubcollectionData(
            iconsDoc.ref,
            'Craftwork'
          )
          const drawerData = await getSubcollectionData(iconsDoc.ref, 'Drawer')
          const drawkitData = await getSubcollectionData(iconsDoc.ref, 'Drawer')
          const getIllustrationsData = await getSubcollectionData(
            iconsDoc.ref,
            'Getillustrations'
          )
          const growwwData = await getSubcollectionData(iconsDoc.ref, 'Growww')
          const lsgraphicsData = await getSubcollectionData(
            iconsDoc.ref,
            'Ls Graphics'
          )

          const result = {
            craftwork: craftworkData,
            drawer: drawerData,
            drawkit: drawkitData,
            getIllustrations: getIllustrationsData,
            growww: growwwData,
            lsgraphics: lsgraphicsData,
          }
          res.status(200).json(result)
        }
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
  // Retrieve subcollection data by querying each subcollection individually
  const subcollectionQuery = query(collection(docRef, subcollectionName))
  const subcollectionSnapshot = await getDocs(subcollectionQuery)

  subcollectionSnapshot.forEach((doc) => {
    data.push(doc.data())
  })

  return data
}
