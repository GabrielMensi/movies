"use client";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

type Profile = {
    username: string;
    name: string;
    iso_3166_1: string;
};


export default function ProfilePage() {
    const router = useRouter();
    const state = useAppSelector((state) => state.auth);
    const [profile, setProfile] = useState<Profile | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const session_id = state.sessionId;
        if (session_id) {
            fetch(`/api/get-profile?session_id=${session_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setProfile(data);
                });
        }
    }, [state]);

    const signOut = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <>
            <h2 className="text-4xl font-bold pb-8">User profile</h2>
            <div className="flex flex-col sm:flex-row py-14">
                <div className="p-4 dark:bg-gray-800 bg-gray-200 rounded-full mr-8 mb-8 sm:mb-0 h-max w-max self-center sm:self-start">
                    <FiUser size={64} />
                </div>

                {profile ? (
                    <div>
                        <p className="text-2xl mb-2">
                            <strong>Username: </strong>{" "}
                            {profile?.username ? profile.username : "-"}
                        </p>
                        <p className="text-2xl mb-2">
                            <strong>Nombre: </strong>{" "}
                            {profile?.name ? profile.name : "-"}
                        </p>
                        <p className="text-2xl mb-20">
                            <strong>Country: </strong>{" "}
                            {profile?.iso_3166_1 ? profile.iso_3166_1 : "-"}
                        </p>
                        <button
                            onClick={signOut}
                            className="text-xl h-max font-semibold leading-6 cursor-pointer dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-100 bg-gray-200 py-4 px-8 transition-all rounded-full"
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}
