import { getData } from "@/lib/util";
import Slider from "@/components/Slider";

export default async function Home() {
    const popularMovies = await getData("/movie/popular");
    const popularTvShows = await getData("/tv/popular");

    return (
        <>
            <Slider title="Popular Movies" list={popularMovies} type={"movie"} />
            <Slider title="Popular Tv Shows" list={popularTvShows} type={"tv-show"} />
        </>
    );
}
