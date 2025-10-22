import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { User } from "../types";
import { db } from "../data/firebase";

const USER_DOCUMENT = 'users';

export const createUser = (user: User) => {
    addDoc(collection(db, USER_DOCUMENT ), {
        ...user
    })
};

export const createUserByUid = (user: User) => {
    setDoc(doc(db, USER_DOCUMENT, user.uid ), {
        ...user
    })
};