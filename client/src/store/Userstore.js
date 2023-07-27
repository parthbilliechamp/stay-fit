import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { auth } from "../fireabse-config";

const store = (set, get) => ({
  user: null,
  email: null,
  setCurrentEmail: (email) => {
    set({ email: email });
  },
  loginWithEmail: async (username, password) => {
    const data = await signInWithEmailAndPassword(auth, username, password);
    set({ user: data.user });
    set({ email: get().user.email });
    return data;
  },
  logOut: async () => {
    await signOut(auth);
    set({ user: null });
  },
  signup: async (username, password) => {
    const data = await createUserWithEmailAndPassword(auth, username, password);
    set({ user: data.user });
    set({ email: get().user.email });
    return data;
  },
});

const userStore = create(
  devtools(
    persist(store, {
      name: "user-details",
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);

export default userStore;
