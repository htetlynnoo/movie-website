type PersonType = {
    id: string;
    name: string;
    gender: number;
};

async function fetchPerson(id: string): Promise<PersonType[]> {
    const token = process.env.TMDB_TOKEN;

    const res = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    console.log(data);

    return data;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const person = await fetchPerson(id);

    return Response.json(person);
}
