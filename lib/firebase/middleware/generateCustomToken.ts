// import * as admin from 'firebase-admin'

// import serviceAccount from './serviceAccountKey.json'

// async function generateCustomToken() {
//   try {
//     const uid = process.env.UNIQUE_USER_ID

//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     })

//     const customToken = await admin.auth().createCustomToken(uid)
//     console.log('Custom Token:', customToken)
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

// generateCustomToken()
