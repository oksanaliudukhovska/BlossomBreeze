import { useDispatch } from 'react-redux'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { listenToAuthChanges } from './redux/slices/authSlice.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCart } from './redux/slices/cartSlice.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase.js'

function App() {

const dispatch = useDispatch();

useEffect(() => {
  dispatch(listenToAuthChanges())
}, [dispatch])

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          dispatch(fetchCart());
      }
  });
  return () => unsubscribe();
}, [dispatch]);

  return (
    <div className="font-nunito flex flex-col min-h-screen">
     <ToastContainer /> 
    <Header/>
    <div className='flex-1 flex pt-[60px] md:pt-[108px]'>
    <Outlet className='flex-1'/>
    </div>
    <Footer/>
    </div>
  )
}

export default App
