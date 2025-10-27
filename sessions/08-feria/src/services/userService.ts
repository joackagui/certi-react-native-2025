import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../types";
import { db } from "../data/firebase";

const USER_DOCUMENT = 'users';

export const createUserByUid = (user: User) => {
    return setDoc(doc(db, USER_DOCUMENT, user.uid ), {
        ...user
    });
};

export const updateUserByUid = (uid: string, user: Partial<User>) => {
    return setDoc(doc(db, USER_DOCUMENT, uid), {
        ...user
    }, { merge: true });
};

export const updateUserPhoto = (uid: string, photoUrl: string) => {
    return updateUserByUid(uid, { photoUrl });
};

export const getUserByUid = async (uid: string) => {
    const snapshot = await getDoc(doc(db, USER_DOCUMENT, uid));
    if (!snapshot.exists()) {
        return null;
    }
    return snapshot.data() as User;
};
