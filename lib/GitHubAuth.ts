import { getAuth, signInWithPopup, GithubAuthProvider, signOut, User } from 'firebase/auth';
import { firebaseApp } from '../firebaseConfig';

const auth = getAuth(firebaseApp);
const githubProvider = new GithubAuthProvider();

export const signInWithGitHub = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    // const credential = GithubAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;

    const user = result.user;

    return user;

  } catch (error: any) {
    // Handle authentication errors
    console.error('GitHub authentication failed:', error);
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData?.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);

    console.error(
      `Error Code: ${errorCode}, Error Message: ${errorMessage}, email: ${email}, Credential: ${credential}`
    );

    throw error;
  }
};

export const signOutGitHub = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('User signed out from GitHub');
  } catch (error) {
    console.error('Error signing out from GitHub:', error);
    throw error;
  }
};

export default signInWithGitHub;
