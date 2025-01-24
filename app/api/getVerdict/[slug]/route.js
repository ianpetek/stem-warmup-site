import { getSession } from '@auth0/nextjs-auth0';

const problemIdByDay = { 1: "404030759741952000", 2: "405132553268236288", 3: "390890364392706054", 4: "390890364392706054", 5: "390890364392706054" }

async function getToken(email) {
    let response = await fetch('https://api.kontestis.ac/api/auth/managed/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: process.env.KONTESTIS_PASSWORD
        })
    })
    let data = await response.json()
    return JSON.parse(data.data).json.token;
}

async function getVerdict(email, day) {
    let token = await getToken(email)
    let response = await fetch('https://api.kontestis.ac/api/submission/by-problem/' + problemIdByDay[day], {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    let data = await response.json()
    return JSON.stringify(data)
}

export async function GET(req, { params }) {
    const { user } = await getSession();
    if (!user) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401 }
        );
    }
    try {
        const slug = (await params).slug
        if (!slug || !slug.match(/^[0-5]$/)) {
            return new Response(
                JSON.stringify({ error: 'Invalid slug' }),
                { status: 400 }
            );
        }
        const email = "susferwarmup+" + user["username"] + "@gmail.com";
        const response = await getVerdict(email, slug);
        if (response.error) {
            return new Response(
                JSON.stringify({ error: response.error }),
                { status: 400 }
            );
        }

        //parse response
        var verdict = [];
        try {
            verdict = JSON.parse(JSON.parse(response).data).json;

            if (verdict.length > 0) {
            // sort elemnts by id in reverse order
            verdict.sort((a, b) => b.id - a.id);
            verdict = verdict[0];
            }
        } catch (error) {
            console.error('Error:', error);
        }
        return new Response(
            JSON.stringify(verdict), // Forward the API's response as JSON
            {
                status: 200, // Use the status from the API response if needed
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ error: 'Something went wrong' }),
            { status: 500 }
        );
    }
}
