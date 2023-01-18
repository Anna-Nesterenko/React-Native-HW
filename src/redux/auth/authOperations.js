import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const { uid, displayName } = await auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email,
        })
      );
      Alert.alert(`Welcome to cabinet`);
    } catch (error) {
      Alert.alert(error.message);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      //   console.log("userLogin", user);
      Alert.alert(`Welcome to cabinet`);
    } catch (error) {
      Alert.alert(error.message);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
    Alert.alert(`Sign-out successful`);
  } catch (error) {
    Alert.alert(error.message);
    console.log("error", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email } = user;
      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email: email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
