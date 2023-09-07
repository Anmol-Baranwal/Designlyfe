import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { firebaseApp } from '../../../firebaseConfig'
import type { NextApiRequest, NextApiResponse } from 'next'

type UserData = {
  userId?: string
  name?: string
  username?: string
  avatarUrl?: string
  theme?: string
  bio?: string
  urls?: { value: string }[]
}

type Data = {
  message: string
  user?: UserData
}

export default async function UpdateUserDetails(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const { userId, username, bio, urls } = req.body

      // manual testing
      //   const userId = 'ePUEKjRZ1qXb80SEkkUDbhzX8Mf2'
      //   const username = 'abc'
      //   const bio = 'fuck off'
      //   const urls = [
      //     { value: 'https://www.linkedin.com/in/Anmol-Baranwal/' },
      //     { value: 'https://twitter.com/Anmol_Codes' },
      //     { value: 'https://github.com/Anmol-Baranwal' },
      //   ]

      const db = getFirestore(firebaseApp)

      // Create a query to find the user with the specified userId
      const usersCollectionRef = collection(db, 'users')
      const userQuery = query(usersCollectionRef, where('userId', '==', userId))
      const querySnapshot = await getDocs(userQuery)

      if (querySnapshot.empty) {
        console.log('User not found')
      }
      const userDoc = querySnapshot.docs[0].ref

      const userUpdateData: Partial<UserData> = {}
      if (username) userUpdateData.username = username
      if (bio) userUpdateData.bio = bio
      if (urls) userUpdateData.urls = urls

      await updateDoc(userDoc, userUpdateData)

      res.status(200).json({
        message: 'User data updated successfully',
        user: {
          ...querySnapshot.docs[0].data(),
          ...userUpdateData,
        },
      })
    } catch (error: any) {
      console.error('Error updating user data:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
