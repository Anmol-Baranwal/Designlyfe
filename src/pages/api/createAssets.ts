import { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { Icons, Illustrations } from '../../../data/assets'

const createAssets = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Delete existing asset collection if it exists
    const assetCollectionRef = collection(db, 'assets')
    const assetCollectionSnapshot = await getDocs(assetCollectionRef)

    if (!assetCollectionSnapshot.empty) {
      res.status(400).json({ message: 'Asset collection already exists' })
      return
    }

    // Create the asset collection and upload new data
    // const iconsDocumentRef = doc(collection(db, 'assets'))
    // await setDoc(iconsDocumentRef, { name: 'Icons' })

    // const illustrationsDocumentRef = doc(collection(db, 'assets'))
    // await setDoc(illustrationsDocumentRef, { name: 'Illustrations' })

    for (const icon of Icons) {
      const iconDocRef = doc(collection(db, 'assets', 'Icons', icon.author))
      await setDoc(iconDocRef, {
        ...icon,
        type: 'Icons',
        author: icon.author,
      })
    }

    for (const illustration of Illustrations) {
      const illustrationDocRef = doc(
        collection(db, 'assets', 'Illustrations', illustration.author)
      )
      await setDoc(illustrationDocRef, {
        ...illustration,
        type: 'Illustrations',
        author: illustration.author,
      })
    }

    res.status(200).json({ message: 'Assets created successfully' })
  } catch (error) {
    console.error('Error creating assets:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default createAssets
