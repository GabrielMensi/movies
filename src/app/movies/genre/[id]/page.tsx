import { getData } from "@/lib/util";
import Slider from "@/components/Slider";

export async function generateStaticParams() {
    const movieGenres = await getData("/genre/movie/list");

    const ids = movieGenres.genres.map((genre: any) => ({
        id: genre.id.toString(),
    }));

    return ids;
}

export default async function GenreMoviePage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const genre = await getData(`/genre/movie/list?language=en`);
    const genreName = genre.genres.find((genre: any) => genre.id == id).name;
    const movies = await getData(
        `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`
    );
    return (
        <>
            <Slider title={`${genreName} Movies`} list={movies} type="movie" />
        </>
    );
}
