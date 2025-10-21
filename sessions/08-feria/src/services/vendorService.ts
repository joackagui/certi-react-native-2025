import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../data/firebase";

const VENDORS_DOCUMENT = 'vendors'
export const fetchVendors = async () => {
    const ref = collection(db, VENDORS_DOCUMENT);
    const q = query(ref, orderBy('name', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map( document => ({ id: document.id, ...document.data()}));
}