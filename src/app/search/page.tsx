import { getData } from "@/lib/util";
import Card from "@/components/Card";
import SearchForm from "@/components/SearchForm";

export default async function Movies({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) {
    const query = searchParams?.query || "";
    const data = await getData(`/search/multi?query=${query}&include_adult=false&language=en-US&page=1`);
    return (
        <>
            <div className="w-full flex justify-between">
                <h2 className="text-4xl font-bold">Search</h2>
                <SearchForm />
            </div>
            <div className="flex gap-4 flex-wrap justify-start pt-20">
                {data.results.map((media: any) =>
                    media.poster_path ? (
                        media.media_type == "movie" ? (
                            <Card key={media.id} data={media} type="movie" />
                        ) : media.media_type == "tv" ? (
                            <Card key={media.id} data={media} type="tv-show" />
                        ) : null
                    ) : null,
                )}
            </div>
        </>
    );
}
