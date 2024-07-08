import { getData } from "@/lib/util";
import Slider from "@/components/Slider";

export async function generateStaticParams() {
    const tvGenres = await getData("/genre/tv/list");

    const ids = tvGenres.genres.map((genre: any) => ({
        id: genre.id.toString(),
    }));

    return ids;
}

export default async function GenreTvShowPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const genre = await getData(`/genre/tv/list?language=en`);
    const genreName = genre.genres.find((genre: any) => genre.id == id).name;
    const tv = await getData(
        `/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`
    );
    return (
        <>
            <Slider title={`${genreName} Movies`} list={tv} type="tv-show" />
        </>
    );
}
