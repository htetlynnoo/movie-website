import { PlayIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "./ui/button";

type GenresType = {
    id: number;
    name: string;
};

async function fetchGenres(): Promise<GenresType[]> {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    });
    const data = await res.json();
    return data.genres;
}

export default async function Sidebar() {
    const genres = await fetchGenres();

    return (
        <aside
            className="min-w-[250px]
pr-4 flex flex-col gap-1 "
        >
            <Button
                variant="outline"
                className="font-bold justify-start"
                asChild
            >
                <Link href="/">
                    <PlayIcon /> All Genres
                </Link>
            </Button>
            <Button
                variant="outline"
                className="font-bold justify-start"
                asChild
            ></Button>

            {genres.map(genre => {
                return (
                    <Button
                        key={String(genre.id)}
                        variant="outline"
                        className="font-bold justify-start"
                        asChild
                    >
                        <Link href={`/genres/${genre.name}/${genre.id}`}>
                            <PlayIcon /> {genre.name}
                        </Link>
                    </Button>
                );
            })}
        </aside>
    );
}
