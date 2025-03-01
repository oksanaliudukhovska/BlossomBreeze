import { doc, setDoc, getDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebase";

export const createCartForUser = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User is not authorized');
        }

        const cartRef = doc(db, 'carts', user.uid);

        const cartSnapshot = await getDoc(cartRef);
        if (!cartSnapshot.exists()) {
           
            await setDoc(cartRef, {
                items: [], 
                updatedAt: new Date().toISOString(),
            }, { merge: true }); 
        } 
    } catch (error) {
        console.error('Error creating cart:', error.message);
    }
};
