import Link from "next/link";
import Stars from "./Stars";
import { env } from "@/config/env";
import Image from "next/image";

export default function Card({
    data,
    type,
}: {
    data: any;
    type: "movie" | "tv-show";
}) {
    const rate = Math.round(data.vote_average * 10);
    return (
        <Link
            href={`/${type == "movie" ? "movies" : "tv-shows"}/${data.id}`}
            className="max-w-56 max-h-96 relative rounded-2xl shadow transition hover:shadow-lg aspect-2/3 mb-5"
        >
            <Image
                alt=""
                src={`${env.IMAGES_BASE_URL}${data.poster_path}`}
                height={336}
                width={224}
                className="absolute inset-0 h-full w-full object-cover rounded-2xl"
            />

            <div className="relative bg-gradient-to-t from-gray-900/90 to-gray-900/25 pt-48 h-full w-full min-w-56 rounded-2xl flex items-end">
                <div className="p-4 flex flex-col justify-end">
                    <h3 className="mt-0.5 text-xl font-bold text-white text-balance tracking-widest">{`${
                        type == "movie" ? data.title : data.name
                    }`}</h3>
                    <Stars rate={rate} />
                </div>
            </div>
        </Link>
    );
}
