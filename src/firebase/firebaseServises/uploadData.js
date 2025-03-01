import { bouquets } from "../../data/bouquets";
import { plants } from "../../data/plants";
import {packing} from '../../data/packing'
import db from "../firebase"; 
import { collection, setDoc, doc, deleteDoc, } from "firebase/firestore"; 

// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import db from "./firebase"; 

const uploadDataBouquets = async () => {
    try {
      const collectionRef = collection(db, "bouquets");
  
      for (const bouquet of bouquets) {
        if (!bouquet.id) {
          console.error("Bouquet doesn't have row 'id':", bouquet);
          continue;
        }
  
        const docRef = doc(collectionRef, bouquet.id);
        await setDoc(docRef, bouquet);
      }
    } catch (error) {
      console.error("Data loading error:", error);
    }
  };
  
  uploadDataBouquets();

  const uploadDataPlants = async () => {
    try {
      const collectionRef = collection(db, "plants");
      for (const plant of plants) {
        if (!plant.id) {
          console.error("Bouquet doesn't have row 'id':", plant);
          continue;
        }
        const docRef = doc(collectionRef, plant.id);
        await setDoc(docRef, plant);
      }
    } catch (error) {
      console.error("Data loading error:", error);
    }
  };
  
  uploadDataPlants();

const uploadDataPacking = async () => {
  try {
    const collectionRef = collection(db, 'packing');
    for(const pack of packing){
      if(!pack.id){
        console.error('packing empty', pack);
        continue;
      }
      const docRef = doc(collectionRef, pack.id);
      await setDoc(docRef, pack);
    }
  } catch (error) {
    console.error('loading error', error)
  }
}

uploadDataPacking()

// const clearBouquets = async () => {
//   try {
//     const collectionRef = collection(db, "bouquets");
//     const querySnapshot = await getDocs(collectionRef);

//     if (querySnapshot.empty) {
//       return;
//     }

//     for (const document of querySnapshot.docs) {
//       await deleteDoc(doc(db, "bouquets", document.id));
//     }
//   } catch (error) {
//     console.error("Ошибка при удалении документов:", error);
//   }
// };

// clearBouquets();
