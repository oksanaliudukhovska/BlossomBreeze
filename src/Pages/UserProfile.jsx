import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const UserProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth"); 
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null; 
  }
  
  const logOut = async () => {
    try {
      await signOut(auth)
      navigate('/auth')
    } catch (error) {
      
    }
  }

  return (
    <section className="bg-bezchBase1/40 text-xl text-bold text-gold pt-10 gap-6 flex flex-col items-center flex-1 w-full min-h-full">
      <h1 className="pt-10">Welcome, {user.displayName || user.email}</h1>
      <button className="border border-gold px-6 py-4" onClick={logOut}>Log out</button>
    </section>
  );
  
};

export default UserProfile;


