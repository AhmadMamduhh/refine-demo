import { AuthBindings } from "@refinedev/core";
import { signOut } from "firebase/auth";
import { auth, logInWithEmailAndPassword, sendPasswordReset } from "./firebase";

// Firebase auth provider
export const firebaseAuthProvider: AuthBindings = {
    // required methods
    login: async ({ email, password }) => {
        // Login using Firebase authentication
       const res = await logInWithEmailAndPassword(email, password)

        if (res && res.user) {
            localStorage.setItem("auth", JSON.stringify(res.user));
            return {
                success: true,
                redirectTo: "/",
            };
        }
        return {
            success: false,
            error: {
                message: "Login Error",
                name: "Invalid email or password",
            },
        };
    },
    check: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
            error: {
                message: "Check failed",
                name: "Unauthorized",
            },
        };
    },
    logout: async () => {
        await signOut(auth)
        localStorage.removeItem("auth");
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
            return {
                logout: true,
                redirectTo: "/login",
                error,
            };
        }

        return {};
    },

    forgotPassword: async ({ email }) => {
        // send password reset link to the user's email address here
        try {
            await sendPasswordReset(email);
            // if request is successful
            return {
                success: true,
                redirectTo: "/login",
            };
        }
        catch (err) {
            // if request is not successful
            return {
                success: false,
                error: {
                    name: "Forgot Password Error",
                    message: "Email address does not exist",
                },
            };
        }
    },
};