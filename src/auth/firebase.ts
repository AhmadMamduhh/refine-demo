// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
    UserCredential,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJY7yscxzZWA4g93LBeId9Q17K2i8I0T4",
  authDomain: "chl-testing.firebaseapp.com",
  projectId: "chl-testing",
  storageBucket: "chl-testing.appspot.com",
  messagingSenderId: "611485361080",
  appId: "1:611485361080:web:78adf025bee34a46fe254d",
  measurementId: "G-V3F4EQ578Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication functions

export const auth = getAuth(app);

/**
 * This functions takes an email and password and tries to log the user into the web app
 * @param email : the user's email address
 * @param password : the user's password
 * @returns Promise<UserCredentials> : promise which contains user's credentials
 */
 export const logInWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
	try {
		return await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
        console.error(err);
        throw err;
	}
};

/**
 * This function creates a new admin user.
 * @param name : user's name
 * @param email : user's email address
 * @param password : user's password
 */
export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
	try {
		 await createUserWithEmailAndPassword(auth, email, password);
        
	} catch (err) {
		console.error(err);
	}
};

/**
 * This function sends a reset password email for the given email of the user
 * @param email : user's email address
 * @returns Promise<boolean> : promise which is true if email is sent and false otherwise.
 */
export const sendPasswordReset = async (email: string): Promise<boolean> => {
	try {
		await sendPasswordResetEmail(auth, email);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
};

/**
 * This function logs the current user out of the web app
 */
export const logout = (): void => {
	signOut(auth);
};