import { getData } from "@/lib/util";
import Slider from "@/components/Slider";

export default async function Movies() {
    const popularMovies = await getData("/movie/popular");
    const topRatedMovies = await getData("/movie/top_rated");

    return (
        <>
            <Slider title="Popular" list={popularMovies} type="movie" />
            <Slider title="Top rated" list={topRatedMovies} type="movie" />
        </>
    );
}
