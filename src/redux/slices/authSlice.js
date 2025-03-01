import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/firebase';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true, 
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.loading = false;
        },
        clearUser(state) {
            state.user = null;
            state.loading = false;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

export const listenToAuthChanges = () => (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const serializedUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            };
            dispatch(setUser(serializedUser));
        } else {
            dispatch(clearUser());
        }
    });
};
