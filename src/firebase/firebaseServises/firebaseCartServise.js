import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth } from "./firebase";
import db from "./firebase";

export const getUserCart = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not logged in");

  const cartRef = doc(db, "carts", user.uid);
  const cartDoc = await getDoc(cartRef);

  if (cartDoc.exists()) {
    return cartDoc.data().items || [];
  } else {
    await setDoc(cartRef, { items: [] }); 
    return [];
  }
};

export const addToCart = async (item) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not logged in");

  const cartRef = doc(db, "carts", user.uid);
  await updateDoc(cartRef, {
    items: arrayUnion(item),
  });
};

export const removeFromCart = async (item) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not logged in");

  const cartRef = doc(db, "carts", user.uid);
  await updateDoc(cartRef, {
    items: arrayRemove(item),
  });
};

export const clearCart = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not logged in");

  const cartRef = doc(db, "carts", user.uid);
  await setDoc(cartRef, { items: [] });
};

