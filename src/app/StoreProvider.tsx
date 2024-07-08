"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { initializeState } from "@/lib/features/auth/authSlice";

export default function StoreProvider({
    state,
    children,
}: {
    state: { value: boolean; token: string; sessionId: string };
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeStore();
        storeRef.current.dispatch(initializeState(state));
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
