import Link from "next/link";

type MovieType = {
    id: string;
    title: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
};
type CastType = {
    id: string;
    name: string;
    character: string;
    profile_path: string;
};

async function fetchMovie(id: string): Promise<MovieType> {
    const token = process.env.TMDB_TOKEN;

    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    console.log(data);
    return data;
}

async function fetchCast(id: string): Promise<CastType[]> {
    const token = process.env.TMDB_TOKEN;

    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await res.json();
    console.log(data);
    return data.cast;
}

export default async function Detail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const movie = await fetchMovie(id);
    const cover = "http://image.tmdb.org/t/p/w1280";
    const casts = await fetchCast(id);
    const profile = "http://image.tmdb.org/t/p/w185";

    return (
        <>
            <h2 className="pb-2 mb-4 border-b font-bold text-lg">
                {movie.title}
            </h2>

            <img
                src={cover + movie.backdrop_path}
                alt={movie.title}
                className="w-[100%]"
            />

            <div className="mt-2">{movie.overview}</div>

            <h2 className="pb-1 mt-4 mb-3 border-b font-bold text-lg">Casts</h2>

            <div className="flex flex-wrap gap-2">
                {casts.map(cast => {
                    return (
                        <div key={cast.id} className="w-[128px] text-center">
                            {cast.profile_path ? (
                                <img
                                    src={profile + cast.profile_path}
                                    alt={cast.name}
                                />
                            ) : (
                                <div className="w-[128px] h-[192px] bg-gray-300"></div>
                            )}
                            <b>
                                <Link href={`/person/${cast.id}`}>
                                    {cast.name}
                                </Link>
                            </b>
                            <div className="text-gray-600 text-sm">
                                {cast.character}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
