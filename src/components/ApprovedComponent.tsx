"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import {
    setToken,
    setSessionId,
    logout,
} from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function ApprovedComponent() {
    const [id, setId] = useState(null);
    const searchParams = useSearchParams();
    const requestToken = searchParams.get("request_token");
    const approved = searchParams.get("approved");
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (approved === "true" && requestToken) {
            const createSession = async () => {
                try {
                    const res = await fetch("/api/create-session", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ requestToken }),
                    });

                    const data = await res.json();
                    console.log(data);
                    setId(data.session_id);
                } catch (error) {
                    console.error("Error creating session:", error);
                }
            };

            createSession();
        }
    }, [approved, requestToken]);

    if (id) {
        console.log(id);
        dispatch(setToken(requestToken));
        dispatch(setSessionId(id));
        router.push("/");
    } else {
        dispatch(logout());
    }

    return <div>Creando sesión...</div>;
}
