import type { Metadata, ResolvingMetadata } from "next";
import { generateDynamicSegment, getData } from "@/lib/util";
import Stars from "@/components/Stars";
import Slider from "@/components/Slider";
import Image from "next/image";
import { env } from "@/config/env";

export async function generateStaticParams() {
    const popular = await generateDynamicSegment("/tv/popular");
    const topRated = await generateDynamicSegment("/tv/top_rated");

    return popular.concat(topRated);
}

export async function generateMetadata(
    { params }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = params;
    const tvShowDetail: any = await getData(`/tv/${id}`);

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: tvShowDetail.name,
        description: tvShowDetail.overview,
        openGraph: {
            images: [
                `${env.IMAGES_BASE_URL}${tvShowDetail.poster_path}`,
                ...previousImages,
            ],
        },
    };
}

export default async function TvShowDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const tvShowDetail: any = await getData(`/tv/${id}`);
    const similarTvShows = await getData(`/tv/${id}/similar`);
    return (
        <>
            <section className="flex flex-col sm:grid sm:grid-cols-3 pb-24">
                <Image
                    src={`${env.IMAGES_BASE_URL}${tvShowDetail.poster_path}`}
                    width={342}
                    height={512}
                    alt={tvShowDetail.name}
                    className="m-auto sm:m-0 sm:max-h-128 aspect-2/3 rounded-2xl"
                />
                <div className="col-span-2 flex flex-col justify-between p-5">
                    <h1 className="text-3xl font-bold mb-4">
                        {tvShowDetail.name}
                    </h1>
                    <p className="mb-2">{tvShowDetail.tagline}</p>
                    <p className="mb-4">{tvShowDetail.overview}</p>
                    <div className="flex justify-between mb-2">
                        <p className="text-gray-500">
                            Release Date: {tvShowDetail.release_date}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-gray-500">
                            Production Companies:
                        </p>
                        {tvShowDetail.production_companies.map(
                            (company: any) => (
                                <p
                                    key={company.id}
                                    className="text-gray-500 pl-4 mb-1"
                                >
                                    {company.name}
                                </p>
                            )
                        )}
                    </div>
                    <Stars rate={tvShowDetail.vote_average * 10} />
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tvShowDetail.genres.map((genre: any) => (
                            <div
                                key={genre.id}
                                className="flex items-center rounded-lg px-3 py-2 bg-gray-600"
                            >
                                <p className="text-base text-white text-center">
                                    {genre.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Slider title="Similar Movies" list={similarTvShows} type="tv-show" />
        </>
    );
}
