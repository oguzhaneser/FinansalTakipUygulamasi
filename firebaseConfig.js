import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0xGwDTzKkxIAvcJxLgqtMqNrKiG8a4nY",
  authDomain: "finansaltakipuygulamasi.firebaseapp.com",
  projectId: "finansaltakipuygulamasi",
  storageBucket: "finansaltakipuygulamasi.appspot.com",
  messagingSenderId: "408081340187",
  appId: "1:408081340187:web:e3c545c769762b439565be",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
