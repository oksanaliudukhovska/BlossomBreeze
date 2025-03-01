import React, { useState } from "react";
import db, { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile} from "firebase/auth";
import authBG from '../assets/authBG.jpg'
import { useNavigate } from "react-router-dom";
import { createCartForUser } from "./CreateUserCart";
import SocialAuth from "./SocialAuth";
import { doc, setDoc } from "firebase/firestore";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('')
  const [isSignMode, setIsSignMode] = useState(false);
  const [error, setError] = useState('')
  let navigate = useNavigate();

  const createUser = async () => { 
    if(!validateEmail(email)){
      setError('Invalid email format');
      return;
    }
    if(!validatePassword(password)){
      setError('Password must by at least 8 characters and contain at least 1 special character');
      return;
    }
    if(!validatePhone(phone)){
      setError('Invalid phone number format. Use +CountryCode and number');
      return;
    }
    setError('');
    try { 
     // new user Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // update user Authentication
    await updateProfile(user, {
      displayName: firstName + " " + lastName, 
    });

    // update in Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email: user.email,
      phone,
      birthDate,
      gender,
      createdAt: new Date(),
    });
      navigate('/profile');
    } catch (error) {
      if(error.code && error.code.includes("email-already-in-use")){
        setError('User already exist')
        return;
      }
      console.error(error.code);
      setError(error.message)
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await createCartForUser();
      navigate('/profile');
    } catch (error) {
      setError('Incorrect email or password')
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  };

  const validatePhone = (phone) => {
    return /^\+\d{10,15}$/.test(phone);
  };

  return (
    <div style={{
      backgroundImage: `url(${authBG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "80vh",
    }} className="flex flex-col justify-center items-center w-full py-6 px-4">
      <div className="bg-white/50 p-4 rounded-md max-w-lg">
        <h4 className="text-xl font-semibold text-center text-headerDark/80">
          Sign in with one of your accounts
        </h4>
        <p className="text-gray-700 text-center mb-4">
          Sign in to make your purchase or {" "}
          <span onClick={() => setIsSignMode(!isSignMode)} className="cursor-pointer font-semibold text-headerDark/80 underline">
            Create an account now
          </span>
        </p>
       <div>
        <SocialAuth/>
       </div>
        <p className="text-center text-gray-500 mb-6 cursor-pointer  " onClick={()=> setIsSignMode(false)}>or <span className="underline">Sign in with your email</span> </p>
        {error && <p className="text-red-500 mb-4 max-w-lg text-center overflow-wrap">{error}</p>}
        {/* Email Input */}
        <div className="relative my-6">
          <input
            type="email"
            id="email"
            className="peer block w-full px-2 py-1 border-b border-gray-400 bg-transparent focus:outline-none"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className={`uppercase absolute left-2 -bottom-0 text-headerDark/70 text-base transition-all peer-focus:-top-4 peer-focus:text-sm
      ${email ? "-top-4 text-sm" : "bottom-0"}`}
          >
            Email
          </label>
        </div>
        {/* Password Input */}
        <div className="relative my-6">
          <input
            type="password"
            id="password"
            className="peer block w-full px-2 py-1 border-b border-gray-400 bg-transparent focus:outline-none"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className={`uppercase absolute left-2 text-base text-headerDark/70 transition-all peer-focus:-top-4 peer-focus:text-sm 
              ${password ? "-top-4 text-sm" : "top-2"}`}
          >
            Password
          </label>
          <p className="px-2 text-gray-400 text-sm">Minimum 8 characters and 1 special character</p>
        </div>
        {isSignMode && (
          <>
            {/* fisrt & last name */}
            <div className="flex justify-between mb-6">
              <div className="relative w-[90%] max-w-[230px]">
                <input
                  type="text"
                  id="firstName"
                  className="peer block w-full px-2 py-1 border-b border-gray-400 bg-transparent focus:outline-none"
                  placeholder=" "
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label
                  htmlFor="firstName"
                  className={`uppercase absolute left-2 -bottom-0 text-headerDark/70 text-base transition-all peer-focus:-top-4 peer-focus:text-sm
                    ${firstName ? "-top-4 text-sm" : "bottom-0"}`}
                >
                  First Name
                </label>
              </div>
              <div className="relative w-[90%] max-w-[240px]">
                <input
                  type="text"
                  id="lastName"
                  className="peer block w-full px-2 py-1 border-b border-gray-400 bg-transparent focus:outline-none"
                  placeholder=" "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label
                  htmlFor="lastName"
                  className={`uppercase absolute left-2 -bottom-0 text-headerDark/70 text-base transition-all peer-focus:-top-4 peer-focus:text-sm
                    ${lastName ? "-top-4 text-sm" : "bottom-0"}`}
                >
                  Last Name
                </label>
              </div>
            </div>
            {/* Phone Input */}
            <div className="relative mb-6">
              <input
                type="tel"
                id="phone"
                className="peer block w-full px-2 py-1 border-b border-gray-400 bg-transparent focus:outline-none"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label
                htmlFor="phone"
                className={`uppercase absolute left-2 bottom-10 md:bottom-5 text-headerDark/70 text-base transition-all peer-focus:-top-4 peer-focus:text-sm
                  ${phone ? "-top-4 text-sm" : "bottom-0"}`}
              >
                Phone
              </label>
              <p className="px-2 text-gray-400 text-sm">We will only call you if something happens with the delivery of your order.</p>
            </div>
            {/* Gender Input */}
            <div className="relative mb-9">
              <select
                id="gender"
               className="peer block w-full px-2 py-1 border-b border-gray-400 bg-transparent focus:outline-none"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled style={{color: "#A0A0A0"}}>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Birthdate Input */}
            <div className="relative mb-6">
              <input
                type="date"
                id="birthDate"
               className="peer block w-full px-2 py-1 border-b border-gray-400 bg-transparent focus:outline-none"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              <label
                htmlFor="birthDate"
                className='uppercase absolute left-2 -top-4 text-headerDark/60 text-base'
              >
                Birthdate
              </label>
            </div>
          </>
        )}
        <button
          onClick={isSignMode ? createUser : signIn}
          className="w-full bg-headerDark text-gold py-2 rounded-md transition-all"
        >
          {isSignMode ? 'Registate' : 'Sign in'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
