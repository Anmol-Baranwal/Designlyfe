import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { firebaseApp } from '../../../firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'

type UserData = {
  userId: string
  name: string
  email: string
  username: string
  avatarUrl: string
  theme: string
  DOB: Date
  bio: string
  urls: { value: string }[]
}

type Data = {
  message: string
  user?: UserData
}

export default async function GetUserDetails(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query

      const db = getFirestore(firebaseApp)

      // Create a query to find the user with the specified userId
      const usersCollectionRef = collection(db, 'users')
      const userQuery = query(usersCollectionRef, where('userId', '==', userId))
      const querySnapshot = await getDocs(userQuery)

      // Check if a user with the specified userId exists
      if (querySnapshot.empty) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      // Get the user data
      const userData = querySnapshot.docs[0].data() as UserData

      res.status(200).json({
        message: 'User data fetched successfully',
        user: userData,
      })
    } catch (error: any) {
      console.error('Error fetching user data:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
