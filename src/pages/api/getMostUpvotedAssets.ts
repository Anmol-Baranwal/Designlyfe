import { NextApiRequest, NextApiResponse } from 'next'
import {
  doc,
  collection,
  getDocs,
  getDoc,
  DocumentData,
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { brandInterface } from '../../../data/assets'

const fetchAssetsWithUpvotes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const brandData: { [key: string]: brandInterface } = {
      Icons: {
        brand: ['Getillustrations'],
      },
      Illustrations: {
        brand: ['Craftwork', 'Getillustrations', 'Ls Graphics'],
      },
    }

    const assetsWithUpvotes: DocumentData[] = []

    for (const assetType in brandData) {
      for (const brand of brandData[assetType].brand) {
        const brandCollectionRef = collection(db, 'assets', assetType, brand)
        const querySnapshot = await getDocs(brandCollectionRef)

        for (const docSnap of querySnapshot.docs) {
          const assetDocRef = doc(db, 'assets', assetType, brand, docSnap.id)
          const assetDoc = await getDoc(assetDocRef)

          if (assetDoc.exists()) {
            const assetData = assetDoc.data()

            if (
              assetData.upvotes &&
              Object.keys(assetData.upvotes).length > 0
            ) {
              assetsWithUpvotes.push(assetData)
            }
          }
        }
      }
    }

    res.status(200).json(assetsWithUpvotes)
  } catch (error) {
    console.error('Error fetching assets with upvotes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default fetchAssetsWithUpvotes
