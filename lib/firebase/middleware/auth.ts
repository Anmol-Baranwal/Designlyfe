import { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin'

const middleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const customToken = req.headers.authorization as string

  if (!customToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(customToken)

    // Add user information to the request object for later use in the route handlers
    ;(req as any).user = decodedToken

    next() // Continue to the next middleware or route handler
  } catch (error) {
    console.error(error)
    return res.status(401).json({ error: 'Invalid custom token' })
  }
}

export default middleware

// ------------------------- how to use middleware with api request -------------------------

// import { firestore } from '../../firebase';
// import { authenticate } from '../../middleware/auth'; // Import the middleware

// export default async (req, res) => {
//   try {
//     // Use the authenticate middleware to check authentication
//     authenticate(req, res, async () => {
//       // Check authorization based on req.user (decoded user information)
//       if (req.user.uid !== 'your-unique-user-id') {
//         return res.status(403).json({ error: 'Forbidden' });
//       }

//       // Firestore data interaction code here

//       res.status(200).json({ message: 'Data sent to Firestore successfully' });
//     });
//   } catch (error) {
// ...
//   }
// };
