import { firebaseApp } from '../firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  getAuth, 
  signOut,
  User
} from 'firebase/auth';

const auth = getAuth(firebaseApp);

export interface SignInResult {
  result: any;
  error: any;
}

export const signIn = async (email: string, password: string): Promise<SignInResult> => {
  let result: any = null,
    error: any = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    error = e;
  }

  return { result, error };
};

export const signUp = async (email: string, password: string): Promise<SignInResult> => {
  let result: any = null,
    error: any = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const user: User | null = result.user;
  } catch (e: any) {
    error = e;
  }

  return { result, error };
};

export const resetPassword = async (email: string): Promise<SignInResult> => {
  let result: any = null,
    error: any = null;
  try {
    await sendPasswordResetEmail(auth, email);
    result = 'Email sent successfully';
  } catch (e: any) {
    error = e;
  }

  return { result, error };
};

export const signOutEmail = async (): Promise<void> => {
    try {
      await signOut(auth);
      console.log('User signed out from email/password authentication');
    } catch (error) {
      console.error('Error signing out from email/password authentication:', error);
      throw error;
    }
  };