import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../data/firebase";

const VENDORS_DOCUMENT = 'vendors'
export const fetchVendors = async () => {
    const ref = collection(db, VENDORS_DOCUMENT);
    const q = query(ref, orderBy('name', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map( document => ({ id: document.id, ...document.data()}));
}

export const subscribeVendors = (
    onChange: ( rows: any[]) => void
) => {
    const ref = collection(db, VENDORS_DOCUMENT);
    const q = query(ref, orderBy('name', 'desc'));
    const unsubscribe = onSnapshot (
        q,
        snap => {
            const data = snap.docs.map(
                document => ((
                    {
                        id: document.id,
                        ...document.data()
                    }
                ))
            );
            onChange(data);
        }
    )
    return unsubscribe;
}
