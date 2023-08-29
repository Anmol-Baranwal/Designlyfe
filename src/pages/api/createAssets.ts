import { NextApiRequest, NextApiResponse } from 'next'
import { icons, illustrations } from '../../../data/assets'
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
} from 'firebase/firestore' // addDoc

const db = getFirestore()

const createAssets = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the asset collection already exists
    // Check if the asset collection already exists
    const assetCollectionRef = collection(db, 'assets')
    const assetCollectionQuery = query(assetCollectionRef)
    const assetCollectionSnapshot = await getDocs(assetCollectionQuery)

    if (!assetCollectionSnapshot.empty) {
      res.status(400).json({ message: 'Asset collection already exists' })
      return
    }

    // Create the asset collection and upload new data
    await setDoc(doc(db, 'assets', 'icons'), {})
    await setDoc(doc(db, 'assets', 'illustrations'), {})
    // await setDoc(doc(db, 'assets', 'mockups'), {});

    // const mockups = [
    //   {
    //     name: 'Mockup 1',
    //     /* other mockup fields */
    //     author: 'Author 1',
    //     category: 'mockups',
    //     upvotes: {},
    //     bookmarks: {},
    //   },
    // ]

    for (const icon of icons) {
      const { author, ...rest } = icon
      const iconDocRef = doc(
        db,
        'assets/icons',
        author,
        icon.name.toLowerCase()
      )
      await setDoc(iconDocRef, { ...rest, category: 'icons' })
    }

    for (const illustration of illustrations) {
      const { author, ...rest } = illustration
      const illustrationDocRef = doc(
        db,
        'assets/illustrations',
        author,
        illustration.name.toLowerCase()
      )
      await setDoc(illustrationDocRef, { ...rest, category: 'illustrations' })
    }

    // for (const mockup of mockups) {
    //   const { author, ...rest } = mockup
    //   const mockupDocRef = doc(
    //     db,
    //     'assets/mockups',
    //     author,
    //     mockup.name.toLowerCase()
    //   )
    //   await setDoc(mockupDocRef, { ...rest, category: 'mockups' })
    // }

    res.status(200).json({ message: 'Assets created successfully' })
  } catch (error) {
    console.error('Error creating assets:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default createAssets
