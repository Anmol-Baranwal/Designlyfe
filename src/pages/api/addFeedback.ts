import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { firebaseApp } from '../../../firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  error: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const { message, rating, uid, email } = req.body

      const db = getFirestore(firebaseApp)

      // Specify the name of your Firestore collection for feedback
      const collectionName = 'feedback'

      // Add a new document to the feedback collection
      await addDoc(collection(db, collectionName), {
        message,
        rating,
        uid,
        email,
        timestamp: new Date(),
      })

      res.status(200).json({
        success: true,
        error: null,
      })
    } catch (error: any) {
      console.error(error)
      res.status(500).json({ success: false, error: 'Failed to add feedback' })
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
