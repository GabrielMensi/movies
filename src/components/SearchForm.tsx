"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchForm() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <form className="flex w-3/4 justify-end">
            <input
                placeholder="Search"
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                className="w-2/4 px-3 py-2 rounded-md text-sm font-medium border border-gray-500"
            />
        </form>
    );
}
