import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  setLogLevel,
} from "firebase/firestore";
import { getFirebaseConfig } from "../services/firebaseConfig";

if (__DEV__) setLogLevel("debug");

const apps = getApps();
const app = apps.length ? apps[0]! : initializeApp(getFirebaseConfig());

export const db = apps.length
  ? getFirestore(app)
  : initializeFirestore(app, {
      experimentalForceLongPolling: true,
    });
