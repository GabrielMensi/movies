"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { setToken } from "@/lib/features/auth/authSlice";

export default function Authenticate() {
    const [requestToken, setRequestToken] = useState(null);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const getRequestToken = async () => {
            try {
                const res = await fetch("/api/request-token");
                const data = await res.json();
                setRequestToken(data.request_token);
                dispatch(setToken(data.request_token));
            } catch (error) {
                console.error("Error fetching request token:", error);
            }
        };

        getRequestToken();
    });

    useEffect(() => {
        if (requestToken) {
            const redirectTo = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(window.location.origin + "/approved")}`;
            router.push(redirectTo);
        }
    }, [requestToken, router]);

    return <div>Redirigiendo para autenticación...</div>;
}
