import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const getUser = async () => {
  const user = await AsyncStorage.getItem("@user");
  return user ? JSON.parse(user) : null;
};

export const login = async (email: string, password: string) => {
  const auth = getAuth();
  await AsyncStorage.setItem("@user", JSON.stringify({ email, password }));
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email: string, password: string) => {
  const auth = getAuth();
  await AsyncStorage.setItem("@user", JSON.stringify({ email, password }));
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  const auth = getAuth();
  await AsyncStorage.removeItem("@user");
  return signOut(auth);
};
