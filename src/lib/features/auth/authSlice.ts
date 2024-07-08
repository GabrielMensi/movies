import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    value: boolean;
    token: string;
    sessionId: string;
}

const initialState: AuthState = {
    value: false,
    token: "",
    sessionId: "",
};

export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        initializeState: (state, action: PayloadAction<AuthState>) => {
            state.value = action.payload.value;
            state.token = action.payload.token;
            state.sessionId = action.payload.sessionId;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
            state.value = true;
        },
        logout: (state) => {
            state.value = false;
            state.token = "";
            state.sessionId = "";
        },
        getCurrentState: (state) => {
            return state;
        },
    },
});

export const { initializeState, setToken, setSessionId, logout, getCurrentState } = authSlice.actions;

export default authSlice.reducer;
