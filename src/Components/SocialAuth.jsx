import React from 'react'
import { auth, googleProvider, facebookProvider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import facebookLogo from "../assets/facebookIcon.png";
import googleLogo from "../assets/googleIcon.png";
import { createCartForUser } from "./CreateUserCart";
import { useNavigate } from 'react-router';

const SocialAuth = () => {
    let navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            await createCartForUser();
            navigate('/profile')
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
            alert("Signed in with Facebook successfully!")
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
           <div className="flex justify-center gap-4 mb-6">
             <img
               src={googleLogo}
               alt="google"
               onClick={signInWithGoogle}
               className="w-12 h-12 rounded-full p-2 border border-gray-300 cursor-pointer transition-transform duration-200 hover:scale-105"
             />
             <img
               src={facebookLogo}
               alt="facebook"
               onClick={signInWithFacebook}
               className="w-12 h-12 rounded-full p-2 border border-gray-300 cursor-pointer transition-transform duration-200 hover:scale-105"
             />
           </div>
    )
}

export default SocialAuth
