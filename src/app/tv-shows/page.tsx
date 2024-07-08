import { getData } from "@/lib/util";
import Slider from "@/components/Slider";

export default async function TvShowsPage() {
    const popularTvShows = await getData("/tv/popular");
    const topRatedTvShows = await getData("/tv/top_rated");

    return (
        <>
            <Slider title="Popular" list={popularTvShows} type="tv-show" />
            <Slider title="Top rated" list={topRatedTvShows} type="tv-show" />
        </>
    );
}
